/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
const AWS = require('aws-sdk');
AWS.config.update({ region: env.REGION }); 
const docClient = new AWS.DynamoDB.DocumentClient();

async function getUserByUserName (username){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
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
        throw Error ('no such user - ' + username);
    }

    return user;

}

exports.handler = async (event) => {
    if (!event || !event.identity || !event.identity.claims) {
        return { error: "Event or identity claims are not provided" };
    }

    const username = event.identity.claims['username'];
    if (!username) {
        return { error: "Username not found in identity claims" };
    }

    try {

        var user = await getUserByUserName(username);
        
        if(!user?.myAffiliate?.affiliateUrl){
            return null;
        }

        var refId = user?.userMyAffiliateId?.affiliateUrl;

        const queryParams = {
            TableName: env.API_CARDSPACKS_USERTABLE_NAME, 
            IndexName: username,
            KeyConditionExpression: 'refId = :refId',
            ExpressionAttributeValues: {
                ':refId': refId
            }
        };

        const queryResult = await docClient.query(queryParams).promise();
        const users = queryResult.Items;

        return users;
    } catch (error) {
        console.error("Error processing request:", error);
        return { error: "Error processing request: " + error.message };
    }
};
