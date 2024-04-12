/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');
const { env } = require("process");


async function saveUser(user){
  var docClient = new AWS.DynamoDB.DocumentClient();

  user.updatedAt = new Date().toISOString();
  var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
  var updatedUserParams = {
      TableName: userTable,
      Item: user
  }; 

  console.log("updating user " + user.id );

  await docClient.put(updatedUserParams).promise().then(data => {
      console.log("updated user " + user.id, JSON.stringify(data, null, 2));
  }).catch(err => {
      console.error("Unable to updating user " + user.id + " . Error JSON:", JSON.stringify(err, null, 2));
      });        
}

async function getUserByEmail(email){
  var docClient = new AWS.DynamoDB.DocumentClient();

  var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

  
  var userParams = {
      TableName:userTable,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
          ":email": email
      }
  };
  var user;
  console.log("searching for user - " + email);

  await docClient.query(userParams).promise().then(data => {
      console.log("Get user by email succeeded:", JSON.stringify(data, null, 2));
      if(data["Items"] && data["Items"].length > 0){
          user = data["Items"][0];
      }
  }).catch(err => {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  });

  return user;

}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`); 
    for (const record of event.Records) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
        if(record.eventName === "INSERT"){
          let email = record.dynamodb.NewImage.contactEmail.S;
          let affiliate_id = record.dynamodb.NewImage.id.S;
          var user = await getUserByEmail(email); // Now valid within an async function
          if(user){
              user.userMyAffiliateId = affiliate_id;
              user.groupRole = user.groupRole == "SUPER_USER" ? "SUPER_USER" : "VIP_USER";
              await saveUser(user); // This should be user instead of affiliate_id
          }
        }
    };
    return 'Successfully processed DynamoDB record'; // No need to wrap in Promise.resolve
};
