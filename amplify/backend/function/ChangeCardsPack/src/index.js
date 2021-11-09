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

async function updateUserPackSubstitution(user){
    user.lastPackSubstitutionDate = new Date().toISOString(); 
    user.numberOfPacksSubstitutions++;
    user.updatedAt = new Date().toISOString();

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = env.API_CARDSPACKS_USERTABLE_NAME;
    var params = {
        TableName:table,
        Item: user
    };

    console.log("updateUserPackSubstitution...");
    
        await docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to updateUserPackSubstitution. Error JSON:", JSON.stringify(err, null, 2));
                //callback("Failed");
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                //callback(null, data);
            }
        }).promise();
    
        console.log("Done updateUserPackSubstitution...");
}


exports.handler = async (event) => {
    var AWS = require("aws-sdk");

    var username = event.identity.claims['cognito:email'];
    if(!username){
        username = event.identity.claims['email'];
    }

    AWS.config.update({
        region: env.REGION
    });

    var user = await getUser(username);

    var oldPackId = event.arguments.input['oldCardsPackId'];
    var newPackId = event.arguments.input['newCardsPackId'];

    for (var i = 0; i < user.cardsPacksIds.length; i++) {
        if(user.cardsPacksIds == oldPackId){
            user.cardsPacksIds.splice(i, 1);
            break;
        }
    }

    user.cardsPacksIds.push(newPackId);
    await updateUserPackSubstitution(user);
};
