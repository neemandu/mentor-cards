/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
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

const AWS = require('aws-sdk');
const { env } = require("process");
const https = require('https'); // or https 

const post = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
  console.log('post payload: ' + payload);
  console.log('post path: ' + path);
  console.log('post defaultOptions: ');
  console.log(defaultOptions);
  const options = { ...defaultOptions, path, method: 'POST' };
  const req = https.request(options, res => {
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

  return Parameters[0].Value; 
}

async function addContactToEmailList(user){
  const body = JSON.stringify(user);

  var bearerToken = await getParam();  // Ensure getParam() correctly fetches the token
  console.log('Got Smoove API token: ' + bearerToken);
  console.log('Request Body:');
  console.log(body);

  const options = {
    hostname: 'rest.smoove.io',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    }
  };

  var msg = await post(options, '/v1/Contacts?updateIfExists=true&restoreIfUnsubscribed=true', body);
  console.log('msg');
  console.log(msg);
  console.log("Send Email: sending POST End");
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    console.log('user handler!');
    if (streamedItem.eventName === 'INSERT') {
          var cellPhone="";


      var user = {
        "email": streamedItem.dynamodb.NewImage.email.S,
        "lists_ToSubscribe": [916068], 
        "firstName": streamedItem.dynamodb.NewImage.fullName?.S ?? "",
        "canReceiveEmails": true,
        "canReceiveSmsMessages": true
        }

        if(streamedItem.dynamodb.NewImage.phone?.S){
          user["cellPhone"] = streamedItem.dynamodb.NewImage.phone?.S;
        }

      await addContactToEmailList(user);
    }
  }
  return { status: 'done' };
};