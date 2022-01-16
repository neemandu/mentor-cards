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
    await docClient.query(userParams, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
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
                            "name": user.fullName,
                            "params": {
                                "name": user.fullName
                            }
                        }
                    }
                }
                users.push(item);               
            });
        }
    }).promise();
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
    await docClient.batchWrite(params, function(err, data) {
        if (err) {
            console.error("Unable to batchWrite. Error JSON:", JSON.stringify(err, null, 2));
            console.log("params");
            console.log(params);
            //callback("Failed");
        } else {
            console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
            console.log("params");
            console.log(params);
            //callback(null, data);
        }
    }).promise();
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
