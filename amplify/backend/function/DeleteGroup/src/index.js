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

async function deleteGroup(group){
    console.log("deleteGroup: " + group.id);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    
    console.log("check against table: " + groupTable);
    var groupParams = {
        TableName:groupTable,
        Key:{
            "id": group.id
        }
    };

    await docClient.delete(groupParams).promise().then(data => {
        console.log("deleteGroup" + group.id+ " succeeded:", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to deleteGroup: " + group.id + ". Error JSON:", JSON.stringify(err, null, 2));
    });
}

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

async function unsubscribeOldUsers(groupUsers){
    for(var i = 0 ; i < groupUsers.length ; i++){
        var groupUser = await getUser(groupUsers[i].username);
        groupUser.status = "NOPLAN";
        groupUser.subscription = null;
        groupUser.groupId = null;
        await saveUser(groupUser);
    }
}

function canUserPerformAction(user, group){
    var canDeleteProgram = false;
    if(user.groupRole && user.groupRole == "ADMIN"){
        canDeleteProgram = true;
        /*for(var i = 0; i < group.groupUsers.length ; i++){
            var currUserName = group.groupUsers[i].username;
            if(user.id == currUserName){
                if(group.groupUsers[i].role == "ADMIN"){
                    canDeleteProgram = true;
                    break;
                }
            }
        }*/
    }
    else{
        canDeleteProgram = false;
    }

    return canDeleteProgram;
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log("Delete Group");
    console.log("event's arguments:");
    console.log(event.arguments);
    var args = event.arguments.input;
    var groupId = args['groupId'];
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    var userlist = args['usernamesList'];
    console.log("Update Group user list with: ");
    console.log(userlist);
    if(user.groupId != groupId){
        throw Error('User Is not authorized to change users');
    }
    else{

        var group = await getGroup(user.groupId);

        var canDeleteGroup = canUserPerformAction(user, group);

        if(!canDeleteGroup){
            throw Error('User' + user.id + ' Is now authorized to delete the group: ' + user.groupId);
        }
        else{
            await unsubscribeOldUsers(group.groupUsers);   
            await deleteGroup(group);  
        }
    }
};
