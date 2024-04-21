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

async function upsertNewContact(user){
  console.log("upsertNewContact: name: " + user.FIRSTNAME + " | email: " + user.EMAIL + " | phone: " + user.SMS);

  var api_key = await getParam();

  var defaultOptions = {
      host: 'api.sendinblue.com',
      port: 443, 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': api_key
      }
  };
  var list_id = parseInt(env.CONTACT_LIST_ID);
  var body = JSON.stringify({
    "attributes": {
         "EMAIL": user.EMAIL,
         "FIRSTNAME": user.FIRSTNAME,
         "LASTNAME": "",
         "SMS": user.SMS,
         "WHATSAPP": user.WHATSAPP,
         "PLAN_STATUS": user.PLAN_STATUS,
         "CREATED_AT": user.CREATED_AT,
         "FIRST_PROGRAM_REGISTRATION_DATE": user.FIRST_PROGRAM_REGISTRATION_DATE,
         "CANCELLATION_DATE": user.CANCELLATION_DATE,
         "COUPON_CODES": user.COUPON_CODES,
         "PAYPAL_TRANSACTION_ID": user.PAYPAL_TRANSACTION_ID,
         "ORGANIZATION": user.ORGANIZATION,
         "END_OF_TRIAL_DATE": user.END_OF_TRIAL_DATE,
         "UPDATE_AT": user.UPDATE_AT
    }, 
    "listIds": [
      list_id
    ],
    "updateEnabled": true,
    "smtpBlacklistSender": [],
    "email": user.EMAIL,
    "emailBlacklisted": false,
    "smsBlacklisted": false
  });
  console.log("upsertNewContact: sending POST Start");

  await post(defaultOptions, "/v3/contacts", body);
  console.log("upsertNewContact: sending POST End");
}

function getEndOfTrialDate(createdAt, couponCodes){
  var trialPeriodInDays = 14;
  var startFreePeriodDate = createdAt;
  console.log('startFreePeriodDate');
  console.log(startFreePeriodDate);
  console.log('couponCodes');
  console.log(couponCodes);
  if(couponCodes &&
      couponCodes.length > 0){
          for(var i = 0 ; i < couponCodes.length ; i++){ 
              if((!couponCodes[i].allowedCardsPacks) || (couponCodes[i].allowedCardsPacks.length == 0)){
                  console.log('couponCodes[i]');
                  console.log(couponCodes[i]);
                  var couponDate = couponCodes[i].createdAt;
                  if(couponDate > startFreePeriodDate){
                      console.log('couponDate > startFreePeriodDate');
                      startFreePeriodDate = couponDate;
                      console.log('startFreePeriodDate');
                      console.log(startFreePeriodDate);
                      trialPeriodInDays = couponCodes[i].trialPeriodInDays;
                      console.log('trialPeriodInDays');
                      console.log(trialPeriodInDays);
                  }
              }
          }
      }
  startFreePeriodDate = new Date(startFreePeriodDate);
  startFreePeriodDate.setDate(startFreePeriodDate.getDate()+trialPeriodInDays); 
  console.log('allPackagesDate');
  console.log(startFreePeriodDate);  
  return new Date(startFreePeriodDate);
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT' ||
        streamedItem.eventName === 'MODIFY ') {
      //pull off items from stream
      var user = {
        FIRSTNAME: streamedItem.dynamodb.NewImage.fullName?.S ?? "",
        EMAIL: streamedItem.dynamodb.NewImage.email.S,
        SMS: streamedItem.dynamodb.NewImage.phone?.S ?? "",
        WHATSAPP: streamedItem.dynamodb.NewImage.phone?.S ?? "",
        PLAN_STATUS: streamedItem.dynamodb.NewImage.status?.S ?? "",
        CREATED_AT: streamedItem.dynamodb.NewImage.createdAt.S,
        UPDATE_AT: streamedItem.dynamodb.NewImage.updatedAt.S,
        FIRST_PROGRAM_REGISTRATION_DATE: streamedItem.dynamodb.NewImage.firstProgramRegistrationDate?.S ?? "",
        CANCELLATION_DATE: streamedItem.dynamodb.NewImage.cancellationDate?.S ?? "",
        COUPON_CODES: streamedItem.dynamodb.NewImage.couponCodes?.L ?? "",
        PAYPAL_TRANSACTION_ID: streamedItem.dynamodb.NewImage.providerTransactionId?.S ?? "",
        ORGANIZATION: streamedItem.dynamodb.NewImage.userOrgMembershipId?.S ?? ""
      };

      user.END_OF_TRIAL_DATE = getEndOfTrialDate(user.CREATED_AT, user.COUPON_CODES);

      await upsertNewContact(user);
    }
  }
  return { status: 'done' };
};