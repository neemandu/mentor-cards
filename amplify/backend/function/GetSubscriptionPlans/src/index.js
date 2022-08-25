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

    await docClient.query(subsParams).promise().then(data => {
        console.log("Get org succeeded:", JSON.stringify(data, null, 2));
        org = data["Items"];
    }).catch(err => {            
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

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
        orgId = user.userOrgMembershipId == null ? "-1" : user.userOrgMembershipId;
    }   
    var subPlans = await getPlansByOrgId(orgId);
    if(!subPlans || subPlans.length == 0){
        subPlans = await getPlansByOrgId("-1");
    }
    return subPlans;
};
