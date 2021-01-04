/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
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

async function pushCardsPackToUser(user, cardsPack){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var newPackId = user.id + cardsPack.id;
    var newPack = {
        id: newPackId,
        packID: cardsPack.id,
        userID: user.id,
        pack: cardsPack,
        owner: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    user.cardsPacks.push(newPack);

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user with new pack : " +cardsPack.id);

    await docClient.put(updatedUserParams, function(err, data) {
        if (err) {
            console.error("Unable to updating user with new pack. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated user with new pack:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();

    console.log("updating new pack owner : " +cardsPack.id);
    var packOwnerTable = env.API_CARDSPACKS_PACKOWNERTABLE_NAME;
    var updatedPackOwner = {
        TableName: packOwnerTable,
        Item: newPack
    };
    await docClient.put(updatedPackOwner, function(err, data) {
        if (err) {
            console.error("Unable to updating pack owner. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated new pack owner:", JSON.stringify(data, null, 2));
            //callback(null, data);
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
    var cardsPack = await getCardsPack(cardsPackId);

    await pushUserToCardsPack(cardsPack, username);
    
    await pushCardsPackToUser(user, cardsPack);

    return true;
};
