/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_AFFILIATETABLE_ARN
	API_CARDSPACKS_AFFILIATETABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, ppid } = require("process");
var AWS = require("aws-sdk");

async function getUser(username){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;    
    var userParams = {
        TableName: userTable,
        IndexName: "status-createdAt-index",
        ProjectionExpression:"id, subscription, email, fullName, phone, couponCodes, createdAt",
        KeyConditionExpression: "Status = :statusVal and refId = :refId",
        ExpressionAttributeValues: {
            ":statusVal": "PLAN",
            ":refId": refId
        }
    };

    console.log("searching for users with a plan");
    var users = [];
    await docClient.query(userParams).promise()



    
    var userParams = {
        TableName:userTable,
        Key:{
            "id": username
        }
    };

    console.log("searching for user - " + username);

    var user;

    await docClient.get(userParams).promise().then(data => {
        console.log("Get user succeeded:", JSON.stringify(data, null, 2));
        user = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        console.log('no such user - ' + username);
    }

    return user;         
}

async function getAffiliateUsers(refId){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
    var userParams = {
        TableName:userTable,
        Key:{
            "refId": refId
        }
    };

    console.log("searching for users with refId - " + refId);

    var users;

    await docClient.get(userParams).promise().then(data => {
        console.log("Get users with refId succeeded:", JSON.stringify(data, null, 2));
        users = data["Items"];
    }).catch(err => {
        console.error("Unable to read items for refId. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        console.log('no users found for refId - ' + refId);
    }

    return user;   
}

function aggregateUsers(users){
    const aggregation = {};

    users.forEach(item => {
        const date = new Date(item.firstProgramRegistrationDate);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!aggregation[year]) {
            aggregation[year] = {};
        }
        if (!aggregation[year][month]) {
            aggregation[year][month] = 0;
        }
        aggregation[year][month]++;
    });

    return aggregation;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // Extract username from event identity claims
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    var refId = user?.myAffiliate?.affiliateID;

    let aggregation = {};
    if(refId){
        var allAffiliateUsers = await getAffiliateUsers(refId);

        // Aggregate users by year and month whose refId matches user's refId
        aggregation = aggregateUsers(allAffiliateUsers);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(aggregation),
    };
};
