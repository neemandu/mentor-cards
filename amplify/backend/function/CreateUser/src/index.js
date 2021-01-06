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

exports.handler = async (event) => {
    var username = event.arguments.input['username'];
    var email = event.arguments.input['email'];
    var phone = event.arguments.input['phone'];

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var user = await getUser(username);

    if(!user){

        console.log('user ' + username + " was NOT found");
        var docClient = new AWS.DynamoDB.DocumentClient();

        var table = env.API_CARDSPACKS_USERTABLE_NAME;
    
        var params = {
            TableName:table,
            Item:{
                "id": username,
                "username": username,
                "email": email,
                "phone": phone,
                "cardsPacks": [],
                "status": "NOPLAN",
                "subscription": null ,
                "numberOfPacksSubstitutions": 0,
                "lastPackSubstitutionDate": null,
                "numberOfPlansSubstitutions": 0,
                "lastPlanSubstitutionDate": null,
                "groupsRoles": [],
                "groupUsers": [],
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString()
            }
        };
    
        console.log("Adding a new user...");
    
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
    
        return params["Item"];
    }

    
    console.log('user ' + username + " was found");
    return user;
    
};
