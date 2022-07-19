/* Amplify Params - DO NOT EDIT
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

async function addWelcomeEmailToMessageQueue(email, phone, fullName){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_WELCOME_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName:table,
        Item:{
            "id": id,
            "email": email,
            "emailDeliveryTime": null,
            "phone": phone,
            "smsDeliveryTime": null,
            "emailTemplateId": 1,
            "name": fullName,
            "params": {
                "name": fullName
            }
        }
    };

    await docClient.put(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to add welcome message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
    });
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

exports.handler = async (event) => {
    var username = event.arguments.input['username'];
    var email = event.arguments.input['email'];
    var phone = event.arguments.input['phone'];
    var fullName = event.arguments.input['fullName'];

    console.log(event);
    console.log('Adding new user:');
    console.log(username);
    console.log(email);
    console.log(phone);
    console.log(fullName);

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var user = await getUser(username);

    if(!user){

        console.log('user ' + email + " was NOT found");
        var docClient = new AWS.DynamoDB.DocumentClient();

        var table = env.API_CARDSPACKS_USERTABLE_NAME;
        
       /* var group = await getUserGroup(username);
        var subscription;
        if(group){
            subscription = group.subscription
        }*/
        var tid = "Empty_" + username;
        var userToInsert = {
            "id": username,
            "username": username,
            "email": email,
            "phone": phone,
            "status": "NOPLAN",
            "subscription": null,
            "numberOfPacksSubstitutions": 0,
            "lastPackSubstitutionDate": null,
            "numberOfPlansSubstitutions": 0,
            "lastPlanSubstitutionDate": null,
            "groupId": null,
            "groupRole": null,
            "firstProgramRegistrationDate": new Date().toISOString(),
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString(),
            "numberOfUsedPacks": 0,
            "cancellationDate": null,
            "couponCodes": [],
            "cardsPacksIds": [],
            "providerTransactionId": tid,
            "fullName": fullName,
            "favouritePacks": [],
            "entries": 1
        };
    
        console.log("Adding a new user...");
        await saveUser(userToInsert);

        await addWelcomeEmailToMessageQueue(email, phone, fullName);
    
        console.log("Done adding a new user...");

        return params["Item"];
    }

    if(!user.entries){
        user.entries = 0;
    }

    user.entries++;
    await saveUser(user);
    console.log('user ' + email + " was found");
    return user;
    
};
