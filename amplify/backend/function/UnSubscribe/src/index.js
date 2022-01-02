
const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["PayPalAPIKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, getgroups } = require("process");
var AWS = require("aws-sdk");
const http = require('https'); // or https 

async function removeUserFromCardsPack(cardsPack, username){
    
    console.log("removing user: " + username + " from pack: " +cardsPack.id);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var isChanged = false;
    for (var i = 0; i < cardsPack.usersIds.length; i++) {
        if(cardsPack.usersIds == username){
            cardsPack.usersIds.splice(i, 1);
            isChanged = true;
            break;
        }
    }
    
    if(isChanged){
        var cardPackParams = {
            TableName: cardPackTable,
            Key:{
                "id" : cardsPack.id
            },
            Item: cardsPack
        };
    
    
        await docClient.put(cardPackParams, function(err, data) {
            if (err) {
                console.error("Unable to update pack with new user. Error JSON:", JSON.stringify(err, null, 2));
                //callback("Failed");
            } else {
                console.log("updated pack with new user:", JSON.stringify(data, null, 2));
                //callback(null, data);
            }
        }).promise();
    }  
}

async function removeUserFromAllPacks(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var username = user.username;
    var params = {
        TableName : packsTable
    };
    console.log("searching for number of used packs for - " + user.username);
    
    await docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to read packs. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get packs succeeded:", JSON.stringify(data, null, 2));
            data.Items.forEach(async function(item) {
                await removeUserFromCardsPack(item, user.username);
            });
        }
    }).promise();
}

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

const post = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
    console.log('post payload: ' + payload);
    console.log('post path: ' + path);
    console.log('post defaultOptions: ');
    console.log(defaultOptions);
    const options = { ...defaultOptions, path, method: 'POST' };
    const req = http.request(options, res => {
        let buffer = "";
        res.on('data', chunk => buffer += chunk)
        res.on('end', () => {
            var buf = "";
            if(buffer != ""){
                buf = JSON.parse(buffer);
            }
            resolve(buf);
            })
    });
    req.on('error', e => reject(e.message));
    req.write(payload);
    req.end();
})

async function cancelPayPalSubscription(transactionId, access_token){
    console.log("cancelPayPalSubscription: " + transactionId);

    var defaultOptions = {
        host: 'api.paypal.com',
        port: 443, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    }

    await post(defaultOptions, "/v1/billing/subscriptions/" + transactionId + "/cancel", "");
}

async function getPayPalAccessToken(){
    console.log("getPayPalAccessToken");
    console.log("getting paypal secret");
    var paypalAPIKey = Parameters[0].Value;
    console.log("getting paypal secret DONE");
    var defaultOptions = {
        host: 'api.paypal.com',
        port: 443, 
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Basic ' + paypalAPIKey
        }
    }

    var response = await post(defaultOptions, "/v1/oauth2/token", "grant_type=client_credentials");
    console.log("getPayPalAccessToken response");
    console.log(response);
    console.log(response["access_token"]);
    return response["access_token"];   
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

    var access_token = await getPayPalAccessToken();
    await cancelPayPalSubscription(user.providerTransactionId, access_token);

    // Removing all group users
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
};
