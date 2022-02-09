/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env, ppid } = require("process");
var AWS = require("aws-sdk");

async function getUserByUserName(username){
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

    await docClient.get(userParams, function(err, data) {
        if (err) {
            console.log("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user succeeded:", JSON.stringify(data, null, 2));
            user = data["Item"];
        }
    }).promise();

    if(!user){
        throw Error ('no such user - ' + username);
    }

    return user;

}

async function getPlansByOrgId(orgId){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var subPlansTable = env.API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME;

    var subsParams = {
        TableName:subPlansTable,
        IndexName: "orgMembership-index",
        KeyConditionExpression: "orgMembership = :orgMembership",
        ExpressionAttributeValues: {
            ":orgMembership": orgId
        }
    };

    console.log("searching for subscription plans for org id - " + orgId);

    var org;

    await docClient.query(subsParams, function(err, data) {
        if (err) {
            console.log("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get org succeeded:", JSON.stringify(data, null, 2));
            org = data["Item"];
        }
    }).promise();

    if(!org){
        console.error('no such org id - ' + orgId);
    }

    return org;

}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log('add coupon code');
    console.log("event's arguments:");
    console.log(event.arguments);
    var username = event?.identity?.claims['cognito:username'];
    if(!username){
        username = event?.identity?.claims['username'];
    }
    var orgId  = "-1";
    if(username != null){
        var user = await getUserByUserName(username);
        orgId = user.orgMembership == null ? "-1" : user.orgMembership;
    }   
    var subPlans = await getPlansByOrgId("-1");
    return subPlans;
};
