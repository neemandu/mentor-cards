/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, getgroups } = require("process");
var AWS = require("aws-sdk");

async function getUserByUSerName(username){
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

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id + " as unsubscribed" );

async function sendRecipt(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_RECIPT_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "email": user.email,
            "emailDeliveryTime": null,
            "phone": user.phone,
            "smsDeliveryTime": null,
            "emailTemplateId": 11,
            "name": user.fullName,
            "params": {
                "name": user.fullName,
                "program": user.subscription.subscriptionPlan.description,
                "amount": user.subscription.subscriptionPlan.fullPrice
            }
        }
    };

    await docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add Unsubscribe message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

async function updateGroup(group, userlist){
    console.log("updateGroup: " + group.id);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    group.groupUsers = userlist;

    var groupParams = {
        TableName:groupTable,
        Item: group
    };

    var group;
    await docClient.put(groupParams, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Updated Group succeeded:", JSON.stringify(data, null, 2));
        }
    }).promise();
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }
    var user = await getUserByUSerName(username);
    user.status = "NOPLAN";
    user.subscription = null;
    user.groupId = null;
    user.groupRole = null;
    await saveUser(user);

    // Removing all group users
    if(user.groupId){
        var group = await getGroup(user.groupId);

        for(var i =0 ; group.groupUsers.length; i++){
            email = group.groupUsers[i].email;
            var groupUser = await getUserByEmail(email);
            groupUser.status = "NOPLAN";
            groupUser.subscription = null;
            groupUser.groupId = null;
            groupUser.groupRole = null;
            await saveUser(groupUser);
        }

async function addUnsubscribeEmailToMessageQueue(email, phone, fullName) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_UNSUBSCRIBE_FROM_PAYPAL_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "email": email,
            "emailDeliveryTime": null,
            "phone": phone,
            "smsDeliveryTime": null,
            "emailTemplateId": 10,
            "name": fullName,
            "params": {
                "name": fullName
            }
        }
    };

    await docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add Unsubscribe message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
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
        await addUnsubscribeEmailToMessageQueue(user.email, user.phone, user.fullName);
    }
    else if(event_type == "PAYMENT.SALE.COMPLETED"){
        var transaction_id = paypal_body.resource.billing_agreement_id;
        console.log('transaction_id: ' + transaction_id);
        var user = await getUserByPayPalTxId(transaction_id);
        //await sendRecipt(user);
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
