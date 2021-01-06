/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	AUTH_MENTORCARDS91F3DC29_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function getUser(username){
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

async function getPaymentProgram(subId){
    console.log("getPaymentProgram: " + subId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var subTable = env.API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME;
    
    console.log("check against table: " + subTable);
    var subParams = {
        TableName:subTable,
        Key:{
            "id": subId
        }
    };

    var subscription;
    await docClient.get(subParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get PaymentProgram succeeded:", JSON.stringify(data, null, 2));
            subscription = data["Item"];
        }
    }).promise();

    if(!subscription){
        throw Error ('no such subscription - ' + subId);
    }

    return subscription;
}

function userReachedMaximumProgramsSwitch(user){
    var date =new Date();
    date.setDate(date.getDate() - 30);
    return user.lastPlanSubstitutionDate > date;
}

async function updateMonthlySubscription(user, paymentProgram, transId){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    var monthlySub = {
        id: 1,
        startDate : new Date().toISOString(),
        paymentProvider : "PayPal",
        providerTransactionId : transId,
        subscriptionPlan: paymentProgram
    };

    console.log("updating new subscription in DB");
    console.log("user before change: ");
    console.log(user);
    console.log("monthlySub: ");
    console.log(monthlySub);

    user.status = "PLAN";
    user.subscription = monthlySub;
    user.lastPlanSubstitutionDate = new Date().toISOString();
    user.updateAt = new Date().toISOString();
    user.numberOfPlansSubstitutions++;
    user.isGroupOwner = paymentProgram.numberOfUsers > 1 ? true : false;

    console.log("user AFTER change: ");
    console.log(user);
    var params = {
        TableName: userTable,
        Item: user
    };

    console.log("Adding a new subscription plan to user: " + user.id + "...");

    await docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

async function createIncognitoGroup(username){
    var name = username + "_Group";
    var userPoolId = env.AUTH_MENTORCARDS91F3DC29_USERPOOLID;
    console.log("Trying to create group in cognito: " + name);

    
    var client = new AWS.CognitoIdentity();
    var response = await client.getGroup(
        name,
        userPoolId
    ).promise();



    if(!response || !response.Group){
        console.log("Creating group in cognito: " + name);

        response = await client.create_group(
            name,
            env.AUTH_MENTORCARDS91F3DC29_USERPOOLID,
            1
        ).promise();
    }
    else{
        console.log("group " + name + " already exists");
    }
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log("event's arguments:");
    var args = event.arguments.input;
    console.log(event.arguments);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    if(userReachedMaximumProgramsSwitch(user)){
        throw Error ('no more programs switches are allowed');
    }
    
    var subId = args['paymentProgramId'];
    var paymentProgram = await getPaymentProgram(subId);

    var transId = args['providerTransactionId'];

     await updateMonthlySubscription(user, paymentProgram, transId);

    if(paymentProgram.numberOfUsers > 1){
        await createIncognitoGroup(username);
    }
};