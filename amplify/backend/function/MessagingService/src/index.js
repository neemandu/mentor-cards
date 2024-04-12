/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["smooveApiKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

var AWS = require("aws-sdk");
const { env } = require("process");
const http = require('https'); // or https 

const post = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
  console.log('post payload: ' + payload);
  console.log('post path: ' + path);
  console.log('post defaultOptions: ');
  console.log(defaultOptions);
  const options = { ...defaultOptions, path, method: 'POST' };
  const req = http.request(options, res => {
      let buffer = "";
      res.on('data', chunk => buffer += chunk)
      res.on('end', () => {
          var buf = "";
          if(buffer != ""){
              buf = JSON.parse(buffer);
              console.log(buf);
          }
          resolve(buf);
          })
  });
  req.on('error', e => reject(e.message));
  req.write(payload);
  req.end();
})

async function getParam(){
  var { Parameters } = await (new AWS.SSM())
  .getParameters({
    Names: ["smooveApiKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
  
  console.log('Parameters:');
  console.log(Parameters);

  // Do not do anything after the await, only the return
  //var request = await (new aws.SSM()).getParameter(params).promise();
  console.log(Parameters[0].Value);
  return Parameters[0].Value; 
}

async function sendEmail(tempalteId, email, params, name){
  console.log("sendEmail: tempalteId: " + tempalteId + " | email: " + email + " | name: " + name);
  console.log("params: ");
  console.log(params);

  var api_key = await getParam();
  var t_name = name == "" ? "לקוח מנטור-קארדס" : name;
  var defaultOptions = {
      host: 'api.sendinblue.com',
      port: 443, 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': api_key
      }
  };

  var body = JSON.stringify({
    "sender":{ 
      "email": "office@mentor-cards.com", 
      "name":"Mentor-Cards"
    },
    "templateId": parseInt(tempalteId),
    "params": params,
    "messageVersions":[
      {
        "to":[
             {
                "email": email,
                "name": t_name
             }
          ]
      }
    ]
    });
  console.log("Send Email: sending POST Start");

  var msg = await post(defaultOptions, "/v3/smtp/email", body);
  console.log('msg');
  console.log(msg);
  console.log("Send Email: sending POST End");
}

async function markAsSent(record){
  var updatedRecord = {
    "id": record.id.S,
    "email": record.email.S,
    "emailDeliveryTime": new Date().toISOString(),
    "phone": record.phone?.S,
    "smsDeliveryTime": null,
    "emailTemplateId": record.emailTemplateId?.N ?? record.emailTemplateId?.S,
    "name": record.name?.S ?? "",
    "params": record.params?.M ?? "",
    "createdAt": record.createdAt?.S ?? new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  };

  var docClient = new AWS.DynamoDB.DocumentClient();
  var messageTable = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;

  var params = {
      TableName: messageTable,
      Item: updatedRecord
  };

  await docClient.put(params).promise().then(data => {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }).catch(err => {
    console.error("Unable to update message Q. Error JSON:", JSON.stringify(err, null, 2));
  });

}

exports.handler = async (event) => {
  console.log('Message Service STARTS!!!!');
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      console.log('streamedItem');
      console.log(streamedItem.dynamodb.NewImage);
      var templateId = streamedItem.dynamodb.NewImage.emailTemplateId.N;
      if(!templateId){
        templateId = streamedItem.dynamodb.NewImage.emailTemplateId.S;
      }
      const email = streamedItem.dynamodb.NewImage.email.S;
      var params = streamedItem.dynamodb.NewImage.params.M;
      var name = streamedItem.dynamodb.NewImage.name?.S ?? "לקוח/ה יקר/ה";
      
      if(params && 
      Object.keys(params).length === 0 && 
      Object.getPrototypeOf(params) === Object.prototype){
        params = {
          "name": name
        };
      }

      console.log("sendEmail: tempalteId: " + templateId + " | email: " + email + " | name: " + name);
      console.log('params:');
      console.log(params);
  
      try{
        await sendEmail(
          templateId, 
          email, 
          params,
          name);
      
        await markAsSent(streamedItem.dynamodb.NewImage);
      }catch(error) {
        console.error(error);
      }
    }
  }
  return { status: 'done' };
};
