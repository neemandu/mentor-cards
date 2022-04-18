/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
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

    await docClient.get(userParams).promise().then(data => {
        console.log("Get user succeeded:", JSON.stringify(data, null, 2));
        user = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        console.log('no such user - ' + username);
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

async function getPack(id){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var packTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    
    var packParams = {
        TableName: packTable,
        Key:{
            "id": id
        }
    };

    console.log("searching for pack - " + id);

    var pack;

    await docClient.get(packParams).promise().then(data => {
        console.log("Get pack succeeded:", JSON.stringify(data, null, 2));
        pack = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!pack){
        throw Error ('no such pack - ' + id);
    }

    return pack;
}


async function incrementLikes(cardsPack){
    
    console.log("incrementLikes - pack: " + cardsPack.id);
    cardsPack.likesCounter++;
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

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

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log(event);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }
    var user = await getUser(username);  
    var cardsPackId = parseInt(event.arguments.input['cardsPackId']);
    var action = event.arguments.input['action'];
    if(action == "add"){
        if(user.favouritePacks == null){
            user.favouritePacks = [cardsPackId];
        }
        else if(!user.favouritePacks.includes(cardsPackId)){
            user.favouritePacks.push(cardsPackId);
        }
    }
    else if (action == "remove"){
        if(user.favouritePacks){
            user.favouritePacks = arrayRemove(user.favouritePacks, cardsPackId);
        }
    }
    user.updatedAt = new Date().toISOString();
    await saveUser(user);

    var pack = await getPack(cardsPackId);
    await incrementLikes(pack);    

};
