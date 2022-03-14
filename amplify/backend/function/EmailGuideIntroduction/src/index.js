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
/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function getAllRelevantUsers(){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;   
    var startDate = new Date();
    startDate.setDate(startDate.getDate()-7); 
    startDate.setHours(0, 0, 0, 0);
    var endDate = new Date();
    endDate.setDate(endDate.getDate()-6); 
    endDate.setHours(0, 0, 0, 0);
    var userParams = {
        TableName: userTable,
        IndexName: "status-createdAt-index",
        ProjectionExpression:"id, createdAt, email, fullName, phone",
        KeyConditionExpression: "#status = :status and #createdAt BETWEEN :startDateTime and :endDateTime",
        ExpressionAttributeNames:{
            "#status": "status",
            "#createdAt": "createdAt"
        },
        ExpressionAttributeValues: {
          ':status': 'NOPLAN',
          ':startDateTime': startDate.toISOString(),
          ':endDateTime': endDate.toISOString()
        }
    };

    console.log("searching for users that were created 7 days ago");
    console.log("start date: " + startDate);
    console.log("end date: " + endDate);
    var users = [];
    await docClient.query(userParams).promise().then(data =>{
        console.log("Query succeeded.");
        
        console.log(data.Items.length);
        data.Items.forEach(function(user) {
            var d = new Date();
            var id = user.email + "_GUIDE_AFTER_7_DAYS_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
            var item = {
                PutRequest: {
                    Item: {
                        "id": id,
                        "email": user.email,
                        "emailDeliveryTime": null,
                        "phone": user.phone,
                        "smsDeliveryTime": null,
                        "emailTemplateId": 3,
                        "createdAt": new Date().toISOString(),
                        "updatedAt": new Date().toISOString(),
                        "name": user.fullName,
                        "params": {
                            "name": user.fullName
                        }
                    }
                }
            }
            users.push(item);
        });
    }).catch(err => {
        console.error("Error JSON:", JSON.stringify(err, null, 2));
    });
    return users;
}

async function insertRecordsToMessagingQueue(users){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var params = {
        RequestItems:{
            [table]: users
        }
    };

    await docClient.batchWrite(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to batchWrite. Error JSON:", JSON.stringify(err, null, 2));
        console.log("params");
        console.log(params);
    });
}

exports.handler = async (event) => {
    var users = await getAllRelevantUsers();
    if(users.length > 0){
        await insertRecordsToMessagingQueue(users);
    }
    else{
        console.log("No users should be notified");
    }
};
