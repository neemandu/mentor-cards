/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    await docClient.put(updatedUserParams, function(err, data) {
        if (err) {
            console.error("Unable to update " + user.id + ". Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated user " + user.id + ".", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
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
    await docClient.get(groupParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get Group succeeded:", JSON.stringify(data, null, 2));
            group = data["Item"];
        }
    }).promise();

    if(!group){
        throw Error ('no such Group - ' + groupId);
    }

    return group;
}

async function unsubscribeOldUsers(userlist, groupUsers){
    for(var i = 0 ; i < groupUsers.length ; i++){
        var shouldBeDeleted = true;
        for(var j = 0 ; j < userlist.length ; j++){
            if(userlist[j].username == groupUsers[i]){
                shouldBeDeleted = false;
            }
        }
        if(shouldBeDeleted){
            var groupUser = await getUser(groupUsers[i]);
            groupUser.status = "Unsubscribed";
            groupUser.subscription = null;
            groupUser.groupId = null;
            await saveUser(groupUser);
        }
    }
}

async function subscribeNewUsers(userlist, groupUsers, subscription, groupId){
    for(var j = 0 ; j < userlist.length ; j++){
        var shouldBeAdded = true;
        for(var i = 0 ; i < groupUsers.length ; i++){
            if(userlist[j].username == groupUsers[i]){
                shouldBeDeleted = false;
            }
        }
        if(shouldBeAdded){
            var groupUser = await getUser(userlist[j].username);
            groupUser.status = "PLAN";
            groupUser.subscription = subscription;
            groupUser.groupId = groupId;
            await saveUser(groupUser);
        }
    }
}

function canUSerPerformAction(user, group){
    var canUpdateProgram = false;
    if(user.groupId){
        for(var i = 0; i < group.groupUsers.length ; i++){
            var currUserName = group.groupUsers[i].username;
            if(user.id == currUserName){
                if(group.groupUsers[i].role == "ADMIN"){
                    canUpdateProgram = true;
                    break;
                }
            }
        }
    }
    else{
        canUpdateProgram = true;
    }

    return canUpdateProgram;
}

async function updateGroup(group, userlist){
    console.log("updateGroup: " + group.id);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    group.groupUsers = userlist;
    group.updatedAt = new Date().toISOString();

    var groupParams = {
        TableName:groupTable,
        Item: group
    };

    var group;
    await docClient.put(groupParams, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Updated Group succeeded:", JSON.stringify(data, null, 2));
        }
    }).promise();
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log("Update Group user list");
    console.log("event's arguments:");
    console.log(event.arguments);
    var args = event.arguments.input;
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    var userlist = args['usernamesList'];
    console.log("Update Group user list with: ");
    console.log(userlist);
    
    if(user.groupId){

        var group = await getGroup(user.groupId);

        var canUpdateProgram = canUSerPerformAction(user, group);

        if(!canUpdateProgram){
            throw Error('User Is now authorized to change users');
        }
        else{
            await unsubscribeOldUsers(userlist, group.groupUsers);
            await subscribeNewUsers(userlist, group.groupUsers, user.subscription, user.groupId);      
            await updateGroup(group, userlist);  
        }
    }
};
