/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
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

function pushUserUsage(email, pack){
    if(!pack.usersUsage){
        pack.usersUsage = [];
    }
    var foundUser = false;
    for(var i = 0; i< pack["usersUsage"].length; i++){
        var packUser = pack["usersUsage"][i];
        if(email == packUser.user){
            foundUser = true;
            packUser.entries++;
        }
        break;
    }
    if(!foundUser){
        var newUser = {
            user: email,
            entries: 1
        }
        pack["usersUsage"].push(newUser);
    }

    return pack;
}

async function incrementPackEntries(cardsPack){
    
    console.log("incrementPackEntries - pack: " + cardsPack.id);
    if(!cardsPack.visitorsCounter){
        cardsPack.visitorsCounter = 0;
    }
    cardsPack.visitorsCounter++;
    console.log("pack: " + cardsPack.id + " new # of visitors: " + cardsPack.visitorsCounter);
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var cardPackParams = {
        TableName: cardPackTable,
        Key:{
            "id" : "" + cardsPack.id
        },
        Item: cardsPack
    };

    await docClient.put(cardPackParams).promise().then(data => {
        console.log("updated pack with new number of visitors:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to update pack with new number of visitors. Error JSON:", JSON.stringify(err, null, 2));
      });

      
}

async function getPack(id){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var packTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    
    var packParams = {
        TableName: packTable,
        Key:{
            "id": "" + id
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 

    console.log('Pack Id: ' + event.arguments.input['cardsPackId']);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);
    var cardsPackId = parseInt(event.arguments.input['cardsPackId']);
    var pack = await getPack(cardsPackId);
    if(user){
        pack = pushUserUsage(user.email, pack);
    }
    await incrementPackEntries(pack);
    return true;
};
