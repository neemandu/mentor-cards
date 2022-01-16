/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
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

    await docClient.get(userParams, function(err, data) {
        if (err) {
            console.log("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user succeeded:", JSON.stringify(data, null, 2));
            user = data["Item"];
        }
    }).promise();

    return user;

}
var g_username;
var g_group;
async function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(group) {
           if(group.groupUsers){
               for(var i =0 ; i< group.groupUsers.length; i++){
                   if(group.groupUsers[i].username == g_username){
                    g_group = group;
                    break;
                   }
               }
           }
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            await docClient.scan(params, onScan).promise();
        }
    }
}

async function getUserGroup(username){
    var docClient = new AWS.DynamoDB.DocumentClient();
    g_username = username;
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;

    
    var groupParams = {
        TableName:groupTable
    };

    console.log("searching for user - " + username);

    await docClient.scan(groupParams, onScan).promise();

    return g_group;
}

exports.handler = async (event) => {
    var username = event.arguments.input['username'];
    var email = event.arguments.input['email'];
    var phone = event.arguments.input['phone'];

    console.log(event);
    console.log('Adding new user:');
    console.log(username);
    console.log(email);
    console.log(phone);

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

        var params = {
            TableName:table,
            Item:{
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
                "providerTransactionId": null
            }
        };
    
        console.log("Adding a new user...");
        console.log(params);
    
        await docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
                //callback("Failed");
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                //callback(null, data);
            }
        }).promise();
    
        console.log("Done adding a new user...");
        
        //AddUserToMailingList(username, email, phone);

        return params["Item"];
    }

    
    console.log('user ' + email + " was found");
    return user;
    
};
