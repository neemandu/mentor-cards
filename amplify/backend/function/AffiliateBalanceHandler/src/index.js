/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_AFFILIATETABLE_ARN
	API_CARDSPACKS_AFFILIATETABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');
const { env } = require("process");

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

async function getAffiliate(refId){
  var docClient = new AWS.DynamoDB.DocumentClient();

  var userTable = env.API_CARDSPACKS_AFFILIATETABLE_NAME;

  
  var userParams = {
      TableName:userTable,
      IndexName: "affiliateUrl-index",
      KeyConditionExpression: "affiliateUrl = :affiliateUrl",
      ExpressionAttributeValues: {
          ":affiliateUrl": refId
      }
  };
  var user;
  console.log("searching for affiliate refId- " + refId);

  await docClient.query(userParams).promise().then(data => {
      console.log("Get affiliate by refId succeeded:", JSON.stringify(data, null, 2));
      if(data["Items"] && data["Items"].length > 0){
          user = data["Items"][0];
      }
  }).catch(err => {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  });

  return user;

}

async function saveAffiliate(affiliate){
  var docClient = new AWS.DynamoDB.DocumentClient();

  affiliate.updatedAt = new Date().toISOString();
  var userTable = env.API_CARDSPACKS_AFFILIATETABLE_NAME;
  var updatedUserParams = {
      TableName: userTable,
      Item: affiliate
  };

  console.log("updating affiliate " + affiliate.id );

  await docClient.put(updatedUserParams).promise().then(data => {
      console.log("updated affiliate " + affiliate.id, JSON.stringify(data, null, 2));
  }).catch(err => {
      console.error("Unable to updating affiliate " + affiliate.id + " . Error JSON:", JSON.stringify(err, null, 2));
      });        
}

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);

    var email = record.dynamodb.NewImage.email?.S;

    var user = await getUserByEmail(email);

    console.log('user email: ' + email);

    if(user &&
      user.refId){

        console.log('user.refId: ' + user.refId);
        var affiliate = await getAffiliate(refId);

        var items = record.dynamodb.NewImage.items?.L;
        var newAmount = 0;
        items.forEach(item => {
          var numOfItems =  item?.M?.numberOfItems?.S;
          let numOfItemsInt = parseInt(numOfItems, 10); 

          if (isNaN(numOfItemsInt)) {
            numOfItemsInt = 1;
          }
          let price = 0;
          if('S' in item.M.pricePerItem){
            price = parseFloat(item.M.pricePerItem['S'])
          }
          else if('N' in item.M.pricePerItem){
            price = item.M.pricePerItem['N']
          }

          console.log('new price : ' + numOfItemsInt * price);
          newAmount += numOfItemsInt * price;
        });
        var commision = newAmount * 0.1;


        console.log('old balance: ' + affiliate.balance);
        console.log('new commision : ' + commision);
        affiliate.balance += commision;
        
        console.log('current balance: ' + affiliate.balance);

        await saveAffiliate(affiliate);
      }
      else{
        console.log('user is not an affiliate');
      }

  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
