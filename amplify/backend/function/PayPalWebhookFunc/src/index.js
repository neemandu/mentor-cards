/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env } = require("process");
var AWS = require("aws-sdk");

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id + " as unsubscribed" );

    await docClient.put(updatedUserParams, function(err, data) {
        if (err) {
            console.error("Unable to updating user " + user.id + " as unsubscribed. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated user " + user.id + " as unsubscribed", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

async function getGroup(groupId){
    console.log("getGroup: " + groupId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    
    console.log("check against table: " + groupTable);
    var groupParams = {
        TableName:groupTable,
        Key:{
            "id": groupId
        }
    };

    var group;
    await docClient.get(groupParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get Group succeeded:", JSON.stringify(data, null, 2));
            group = data["Item"];
        }
    }).promise();

    if(!group){
        throw Error ('no such Group - ' + groupId);
    }

    return group;
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

    await docClient.query(userParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user by email succeeded:", JSON.stringify(data, null, 2));
            if(data["Items"] && data["Items"].length > 0){
                user = data["Items"][0];
            }
        }
    }).promise();

    if(!user){
        throw Error ('no such email - ' + email);
    }

    return user;

}

async function cancelUserSubscription(user){
    console.log("Canceling user subscription!");
    if(user.groupId){
        var group = await getGroup(user.groupId);
        for(var i =0 ; group.groupUsers.length; i++){
            email = group.groupUsers[i].email;
            var groupUser = await getUserByEmail(email);
            groupUser.status = "NOPLAN";
            groupUser.groupId = null;
            groupUser.groupRole = null;
            groupUser.cancellationDate = new Date().toISOString();
            groupUser.cardsPacksIds = []
            await saveUser(groupUser);
        }
    }

    user.status = "NOPLAN";
    user.groupId = null;
    user.groupRole = null;
    user.cancellationDate = new Date().toISOString();
    user.cardsPacksIds = []
    await saveUser(user);
}

function sendRecipt(){
    console.log("Should Send a recipt!! Not yet implemented");
}

async function getUserByPayPalTxId(transaction_id){
    console.log("searching user by paypal transaction id - " + transaction_id);
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
    var userParams = {
        TableName:userTable,
        IndexName: "providerTransactionId-index",
        KeyConditionExpression: "providerTransactionId = :providerTransactionId",
        ExpressionAttributeValues: {
            ":providerTransactionId": transaction_id
        }
    };
    var user;

    await docClient.query(userParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user by paypal transaction id succeeded:", JSON.stringify(data, null, 2));
            if(data["Items"] && data["Items"].length > 0){
                user = data["Items"][0];
            }
        }
    }).promise();

    if(!user){
        throw Error ('no such  paypal transaction id - ' + transaction_id);
    }

    return user;

}

exports.handler = async (event) => {
    console.log('PayPal webhook!');
    console.log('event:');
    console.log(event);
    var paypal_body = JSON.parse(event.body);
    var event_type = paypal_body.event_type;
    var transaction_id = paypal_body.resource.billing_agreement_id;
    console.log('event_type: ' + event_type);
    if(event_type == "BILLING.SUBSCRIPTION.CANCELLED"){
        var transaction_id = paypal_body.resource.id;
        console.log('transaction_id: ' + transaction_id);
        var user = await getUserByPayPalTxId(transaction_id);
        await cancelUserSubscription(user);
    }
    else if(event_type == "PAYMENT.SALE.COMPLETED"){
        var transaction_id = paypal_body.resource.billing_agreement_id;
        console.log('transaction_id: ' + transaction_id);
        sendRecipt();
    }
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
