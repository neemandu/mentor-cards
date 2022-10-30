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

async function getUserByEmail(email){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
    var userParams = {
        TableName:userTable,
        IndexName: "email-index",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": email
        }
    };
    var user;
    console.log("searching for user - " + email);

    await docClient.query(userParams).promise().then(data => {
        console.log("Get user by email succeeded:", JSON.stringify(data, null, 2));
        if(data["Items"] && data["Items"].length > 0){
            user = data["Items"][0];
        }
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

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

async function unsubscribeOldUsers(userlist, groupUsers){
    for(var i = 0 ; i < groupUsers.length ; i++){
        var shouldBeDeleted = true;
        for(var j = 0 ; j < userlist.length ; j++){
            if(userlist[j].email == groupUsers[i].email){
                shouldBeDeleted = false;
            }
        }
        if(shouldBeDeleted){
            var groupUser = await getUserByEmail(groupUsers[i].email);
            if(groupUser){
                groupUser.status = "NOPLAN";
                groupUser.subscription = null;
                groupUser.groupId = null;
                groupUser.groupRole = null;
                await saveUser(groupUser);
            }
        }
    }
}

async function subscribeNewUsers(userlist, groupUsers, subscription, groupId){
    for(var j = 0 ; j < userlist.length ; j++){
        var shouldBeAdded = true;
        for(var i = 0 ; i < groupUsers.length ; i++){
            if(userlist[j].email == groupUsers[i].email){
                shouldBeAdded = false;
            }
        }
        if(shouldBeAdded){
            var groupUser = await getUserByEmail(userlist[j].email);
            if(groupUser){
                groupUser.status = "PLAN";
                groupUser.subscription = subscription;
                groupUser.groupId = groupId;
                groupUser.groupRole = userlist[j].role;
                await saveUser(groupUser);
            }
        }
    }
}

function canUSerPerformAction(user, group){
    var canUpdateProgram = false;
    console.log("update group user list: canUSerPerformAction");
    console.log(user);
    console.log(group);
    if(user.groupId == group.id && user.groupRole == "ADMIN"){
        canUpdateProgram = true;
        /*for(var i = 0; i < group.groupUsers.length ; i++){
            var currUserEmail = group.groupUsers[i].email;
            if(user.email == currUserEmail){
                if(group.groupUsers[i].role == "ADMIN"){
                    canUpdateProgram = true;
                    break;
                }
            }
        }*/
    }
    else{
        canUpdateProgram = false;
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
    await docClient.put(groupParams).promise().then(data => {
        console.log("Updated Group succeeded:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      });
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

    var user = await getUserByUSerName(username);

    var userlist = args['usernamesList'];
    console.log("Update Group user list with: ");
    console.log(userlist);
    
    if(user.groupId && user.groupRole){

        var group = await getGroup(user.groupId);

        var canUpdateProgram = canUSerPerformAction(user, group);

        if(!canUpdateProgram){
            throw Error('User Is not authorized to change users');
        }
        else{
            await unsubscribeOldUsers(userlist, group.groupUsers);
            await subscribeNewUsers(userlist, group.groupUsers, user.subscription, user.groupId);      
            await updateGroup(group, userlist);  
        }
    }
    else{
        throw Error('User is not in the group');
    }
};
