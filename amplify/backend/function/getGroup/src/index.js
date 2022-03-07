/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function getGroup(groupId){
    console.log("getGroup: " + groupId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    
    console.log("check against table: " + groupTable);
    var groupParams = {
        TableName:groupTable,
        Key:{
            "id": groupId
        }
    };

    var group;

    await docClient.get(groupParams).promise().then(data => {
        console.log("Get Group succeeded:", JSON.stringify(data, null, 2));
        group = data["Item"];
      }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      });

    if(!group){
        throw Error ('no such Group - ' + groupId);
    }

    return group;
}

function canUserGetGroupDetails(email, group){
    var canRead = false;
    for(var i = 0; i < group.groupUsers.length ; i++){
        var currEmail = group.groupUsers[i].email;
        if(email == currEmail && group.groupUsers[i].role == "ADMIN"){
            canRead = true;
            break;
        }
    }

    return canRead;
}

async function getUserByUSerName(username){
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

exports.handler = async (event) => {
    console.log('get group');
    console.log(event)
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUserByUSerName(username);
    var groupId = event.arguments.input["id"];
    var group = await getGroup(groupId);
    var canRead = canUserGetGroupDetails(user.email, group);
    console.log('group');
    console.log(group);
    if(canRead){
        console.log('user: ' + username + ' is authorized to read the group details because he is an admin.' );
        return group;
    }
    console.log('user: ' + username + ' is not authorized to read the group details.' );
    return null;

};
