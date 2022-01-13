/*
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


exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const name = streamedItem.dynamodb.NewImage.fullName.S
      const email = streamedItem.dynamodb.NewImage.email.S
      const phone = streamedItem.dynamodb.NewImage.phone.S

      await sendWelcomeEmail(
        name, 
        email, 
        phone);
    }
  }
  return { status: 'done' }
};
