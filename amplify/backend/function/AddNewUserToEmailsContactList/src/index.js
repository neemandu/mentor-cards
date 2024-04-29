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
      res.on('data', chunk => buffer += chunk);
      res.on('end', () => {
          var buf = "";
          if(buffer != ""){
              buf = JSON.parse(buffer);
          }
          resolve(buf);
          });
  });
  req.on('error', e => reject(e.message));
  req.write(payload);
  req.end();
});

async function getParam(){
  var { Parameters } = await (new AWS.SSM())
  .getParameters({
    Names: ["smooveApiKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise(); 
  
  console.log('Parameters:');
  console.log(Parameters);

  return Parameters[0].Value; 
}

async function addContactToEmailList(user){
 var api_key = await getParam();

  var defaultOptions = {
      host: 'rest.smoove.io',
      port: 443, 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': api_key
      }
  };
  
  var body = JSON.stringify(user);
  console.log("upsertNewContact: sending POST Start");

  await post(defaultOptions, "/v1/async/contacts", body);
  console.log("upsertNewContact: sending POST End");
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
          
      var user = {
        "email": streamedItem.dynamodb.NewImage.email.S,
        "lists_ToSubscribe": [916068], 
        "firstName": streamedItem.dynamodb.NewImage.fullName?.S ?? "",
        "cellPhone": streamedItem.dynamodb.NewImage.phone?.S ?? "",
        "canReceiveEmails": true,
        "canReceiveSmsMessages": true
        }

      await addContactToEmailList(user);
    }
  }
  return { status: 'done' };
};