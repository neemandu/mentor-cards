/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');

const { env } = require("process");
var AWS = require("aws-sdk");
const http = require('https'); // or https 

async function removeUserFromCardsPack(cardsPack, username){
    
    console.log("removing user: " + username + " from pack: " +cardsPack.id);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var isChanged = false;
    for (var i = 0; i < cardsPack.usersIds.length; i++) {
        if(cardsPack.usersIds[i] == username){
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
    
        await docClient.put(cardPackParams).promise().then(data => {
            console.log("updated pack with new user:", JSON.stringify(data, null, 2));
          }).catch(err => {
            console.error("Unable to update pack with new user. Error JSON:", JSON.stringify(err, null, 2));
          });

    }  
}

async function removeUserFromAllPacks(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;
    var params = {
        TableName : packsTable
    };
    console.log("searching for number of used packs for - " + user.username);
    
    await docClient.scan(params).promise().then(data => {      
        console.log("Get packs succeeded:", JSON.stringify(data, null, 2));
        data.Items.forEach(async function(item) {
            await removeUserFromCardsPack(item, user.username);
        });    
    }).catch(err => {
        console.error("Unable to read packs. Error JSON:", JSON.stringify(err, null, 2));
    });
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

    await docClient.query(userParams).promise().then(data => {
        console.log("Get user by email succeeded:", JSON.stringify(data, null, 2));
        if(data["Items"] && data["Items"].length > 0){
            user = data["Items"][0];
        }
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

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

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id + " as unsubscribed", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " as unsubscribed. Error JSON:", JSON.stringify(err, null, 2));
        });        
}

const post = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
    console.log('post payload: ' + payload);
    console.log('post path: ' + path);
    console.log('post defaultOptions: ');
    console.log(defaultOptions);
    const options = { ...defaultOptions, path, method: 'POST' };
    const req = http.request(options, res => {
        let buffer = "";
        res.on('data', chunk => buffer += chunk);
        res.on('end', () => {
            var buf = "";
            if(buffer != ""){
                buf = JSON.parse(buffer);
            }
            resolve(buf);
            });
    });
    req.on('error', e => reject(e.message));
    req.write(payload);
    req.end();
});

async function cancelPayPalSubscription(transactionId, access_token){
    console.log("cancelPayPalSubscription: " + transactionId);

    var defaultOptions = {
        host: 'api.paypal.com',
        port: 443, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    };

    await post(defaultOptions, "/v1/billing/subscriptions/" + transactionId + "/cancel", "");
}

async function getPayPalAccessToken(){
    console.log("getPayPalAccessToken");
    console.log("getting paypal secret");
    var defaultOptions = {
        host: 'api.paypal.com',
        port: 443, 
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Basic QVRleGlMUFZFWG9meXF6aXNVOU1UMk54bFV1bTJYdnVwNktad0hVc2tVajk5VDRzblZCLU55M3hkMUw4NTFQTVY0OEJoVUktSkZYbk56a3Q6RUxPd3pkOFZ0M0lCWHVwQzBLMDJhckFhbENpRl95WW9HTWo0cm9CVEV5Sk5vLTZxNXBNdEhOYTNZY3F1Y2hSWWwxZTFoYjRMc1lzSk9HWEI='
        }
    };

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

    await docClient.get(groupParams).promise().then(data => {
        console.log("Get Group succeeded:", JSON.stringify(data, null, 2));
        group = data["Item"];
      }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      });
      
    if(!group){
        throw Error ('no such Group - ' + groupId);
    }

    return group;
}

async function addUnsubscribeEmailToMessageQueue(email, phone, fullName) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_UNSUBSCRIBE_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
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
    await docClient.put(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to add Unsubscribe message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
      });
    
}

exports.handler = async (event) => {
  
    console.log('handler:');
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var providerTransactionId = event.arguments.input['providerTransactionId'];
    console.log('providerTransactionId:');
    console.log(providerTransactionId);

    console.log('getUserByUSerName:');
    var user = await getUserByUSerName(username);

    console.log('getPayPalAccessToken:');
    var access_token = await getPayPalAccessToken();
          
    await cancelPayPalSubscription(providerTransactionId, access_token);
    var t_id = '-1';
    if(user.subscription){
        t_id = user.subscription.providerTransactionId
    }
     
    if(providerTransactionId == t_id){
        
        console.log('site subscription:');
        user.status = "NOPLAN";
        user.groupId = null;
        user.groupRole = null;
        user.cancellationDate = new Date().toISOString();
        user.subscription.cancellationDate = new Date().toISOString();
        user.cardsPacksIds = [];
    }
    else{
       
    console.log('externalPacksSubscriptions:');
        for(var i = 0; i < user.externalPacksSubscriptions.length; i++){
            if(user.externalPacksSubscriptions[i].providerTransactionId == providerTransactionId){
                user.externalPacksSubscriptions[i].cancellationDate = new Date().toISOString();
            }
        }
    }

    await saveUser(user);

    await addUnsubscribeEmailToMessageQueue(user.email, user.phone, user.fullName);
};
