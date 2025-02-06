/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
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

    console.log("updating user " + user.id );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id, JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " . Error JSON:", JSON.stringify(err, null, 2));
        });        
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log(`EVENT: ${JSON.stringify(event)}`);
    var username = event.arguments.input['username'];
    var phone = event.arguments.input['phone'];
    var status = event.arguments.input['status'];
    var numberOfPacksSubstitutions = event.arguments.input['numberOfPacksSubstitutions'];
    var numberOfPlansSubstitutions = event.arguments.input['numberOfPlansSubstitutions'];
    var numberOfUsedPacks = event.arguments.input['numberOfUsedPacks'];
    var groupRole = event.arguments.input['groupRole'];
    var groupId = event.arguments.input['groupId'];
    var cancellationDate = event.arguments.input['cancellationDate'];
    var providerTransactionId = event.arguments.input['providerTransactionId'];
    var fullName = event.arguments.input['fullName'];
    var profession = event.arguments.input['profession'];

    
    var user = await getUser(username);

    

    if (!user || !user.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid user data" })
        };
    }

    user.phone = phone;
    user.status = status;
    user.numberOfPacksSubstitutions = numberOfPacksSubstitutions;
    user.numberOfPlansSubstitutions = numberOfPlansSubstitutions;
    user.groupId = groupId;
    user.numberOfUsedPacks = numberOfUsedPacks;
    user.groupRole = groupRole;
    user.providerTransactionId = providerTransactionId;
    user.fullName = fullName;
    user.profession = profession;

    await saveUser(user);
};
