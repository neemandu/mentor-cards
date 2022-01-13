/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["sendinblueAPIKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

const aws = require('aws-sdk');
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
          }
          resolve(buf);
          })
  });
  req.on('error', e => reject(e.message));
  req.write(payload);
  req.end();
})

async function getParam(){
  var { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["sendinblueAPIKey"].map(secretName => process.env[secretName]),
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

async function sendWelcomeEmail(tempalteId, email, params, name){
  console.log("sendWelcomeEmail: tempalteId: " + tempalteId + " | email: " + email + " | params: " + params + " | name: " + name);

  var api_key = await getParam();

  var defaultOptions = {
      host: 'api.sendinblue.com',
      port: 443, 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': api_key
      }
  }

  var body = JSON.stringify({
    "sender":{ 
      "email": "office@mentor-cards.com", 
      "name":"Mentor-Cards"
    },
    "templateId": tempalteId,
    "params": params,
    "messageVersions":[
      {
        "to":[
             {
                "email": email,
                "name": name
             }
          ]
      }
    ]
    });
  console.log("sendWelcomeEmail: sending POST Start");

  await post(defaultOptions, "/v3/smtp/email", body);
  console.log("sendWelcomeEmail: sending POST End");
}

async function markAsSent(record){
  var updatedRecord = {
    "id": record.id.S,
    "email": record.email.S,
    "emailDeliveryTime": new Date().toISOString(),
    "phone": record.phone.S,
    "smsDeliveryTime": null,
    "emailTemplateId": record.emailTemplateId.N,
    "name": record.name.S,
    "params": record.params.S
  }

  var docClient = new AWS.DynamoDB.DocumentClient();
  var messageTable = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;

  var params = {
      TableName: messageTable,
      Item: updatedRecord
  };

  await docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to update message Q. Error JSON:", JSON.stringify(err, null, 2));
          //callback("Failed");
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          //callback(null, data);
      }
  }).promise();
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const templateId = streamedItem.dynamodb.NewImage.emailTemplateId.S
      const email = streamedItem.dynamodb.NewImage.email.S
      const params = streamedItem.dynamodb.NewImage.params.S
      const name = streamedItem.dynamodb.NewImage.name.S

      await sendWelcomeEmail(
        templateId, 
        email, 
        params,
        name);

        await markAsSent(streamedItem.dynamodb.NewImage);
    }
  }
  return { status: 'done' }
};
