/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
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

function canUserGetGroupDetails(username, group){
    var canRead = false;
    for(var i = 0; i < group.groupUsers.length ; i++){
        var currUserName = group.groupUsers[i].username;
        if(username == currUserName){
            if(group.groupUsers[i].role == "ADMIN"){
                canRead = true;
                break;
            }
        }
    }

    return canRead;
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

    var groupId = event.arguments.input["id"];
    var group = await getGroup(groupId);
    var canRead = canUserGetGroupDetails(username, group);

    if(canRead){
        console.log('user: ' + username + ' is authorized to read the group details because he is an admin.' );
        return group;
    }
    console.log('user: ' + username + ' is not authorized to read the group details.' );
    return null;

};
