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

async function updateUser(user){
    user.groupId = groupId;
    user.status = "PLAN";
    user.subscription = group.subscription;
    await saveUser(user);
}

function canJoinGroupFunc(user, group){
    var canJoinGroup = false;
    for(var i = 0; i < group.groupUsers.length ; i++){
        var currUserName = group.groupUsers[i].username;
        if(user.id == currUserName){
            canJoinGroup = true;
            break;
        }
    }

    return canJoinGroup;
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    var args = event.arguments.input;
    var groupId = args['groupId'];

    var group = await getGroup(groupId);

    var canJoinGroup = canJoinGroupFunc(user, group);

    if(!canJoinGroup){
        throw Error('User is not authorized to join group');
    }
    else{

        await updateUser(user);     
    }

};
