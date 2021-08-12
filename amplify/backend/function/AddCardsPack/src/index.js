/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
    API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    API_CARDSPACKS_PACKOWNERTABLE_ARN
	API_CARDSPACKS_PACKOWNERTABLE_NAME
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

function userReachedMaximumPacks(user){
    return user.cardsPacks && user.cardsPacks.length == user.subscription.subscriptionPlan.numberOfCardPacks;
}

async function getCardsPack(cardsPackId){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;
    var cardsParams = {
        TableName: cardPackTable,
        Key:{
            "id": cardsPackId
        }
    };

    console.log("searching for card - " + cardsPackId);

    var cardPack;

    await docClient.get(cardsParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get card succeeded:", JSON.stringify(data, null, 2));
            cardPack = data["Item"];
        }
    }).promise();

    if(!cardPack){
        throw Error ('no such card - ' + cardsPackId);
    }

    return cardPack;
}

async function pushUserToCardsPack(cardsPack, username){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    cardsPack.usersIds.push(username);
    var cardPackParams = {
        TableName: cardPackTable,
        Key:{
            "id" : cardsPack.id
        },
        Item: cardsPack
    };

    console.log("updating pack with new user : " +username);

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

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    var params = {
        TableName: userTable,
        Item: user
    };

    console.log("saveUser " +user.username);

    await docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to saveUser. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("updated saveUser:", JSON.stringify(data, null, 2));
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

    var user = await getUser(username);

    if(userReachedMaximumPacks(user)){
        throw Error ('no more packs are allowed');
    }

    var cardsPackId = event.arguments.input['cardsPackId'];
    user.cardsPacksIds.push(cardsPackId);
    user.numberOfUsedPacks++;
    user.updatedAt = new Date().toISOString();
    await saveUser(user);

    return true;
};
