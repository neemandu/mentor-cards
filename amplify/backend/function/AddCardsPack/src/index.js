/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");

exports.handler = async (event) => {
    var AWS = require("aws-sdk");

    var username = event.identity.claims['cognito:username'];

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

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

    docClient.get(userParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user succeeded:", JSON.stringify(data, null, 2));
            user = data["Item"];
        }
    });

    if(!user){
        throw Error ('no such user - ' + username);
    }


    if(user.cardsPacks && user.cardsPacks.length == subscriptionPlan.numberOfCardPacks){
        throw Error ('no more packs are allowed');
    }


    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;
    var cardsParams = {
        TableName: cardPackTable,
        Key:{
            "id": event.arguments.cardsPackId
        }
    };

    console.log("searching for card - " + event.arguments.cardsPackId);

    var cardPack;

    docClient.get(cardsParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get card succeeded:", JSON.stringify(data, null, 2));
            cardPack = data["Item"];
        }
    });

    if(!cardPack){
        throw Error ('no such card - ' + event.arguments.cardsPackId);
    }

    cardPack.usersIds.push(username);

    var newPackId = username + event.arguments.cardsPackId;
    var newPack = {
        id: newPackId,
        packID: event.arguments.cardsPackId,
        userID: username,
        pack: cardPack,
        owner: username
    };

    user.cardPack.push(newPack);

    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user with new pack : " + event.arguments.cardsPackId);

    docClient.put(updatedUserParams, function(err, data) {
        if (err) {
            console.error("Unable to updating user with new pack. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated user with new pack:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    });

    var cardPackParams = {
        TableName: cardPackTable,
        Item: cardPack
    };

    console.log("updating pack with new user : " +username);

    docClient.put(cardPackParams, function(err, data) {
        if (err) {
            console.error("Unable to update pack with new user. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated pack with new user:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    });

    return true;
};
