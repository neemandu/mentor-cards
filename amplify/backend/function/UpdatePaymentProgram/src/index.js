/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	AUTH_MENTORCARDS91F3DC29_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	AUTH_MENTORCARDS91F3DC29_USERPOOLID
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

    if(!user){
        throw Error ('no such user - ' + username);
    }

    return user;

}

async function getPaymentProgram(subId){
    console.log("getPaymentProgram: " + subId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var subTable = env.API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME;
    
    console.log("check against table: " + subTable);
    var subParams = {
        TableName:subTable,
        Key:{
            "id": subId
        }
    };

    var subscription;
    await docClient.get(subParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get PaymentProgram succeeded:", JSON.stringify(data, null, 2));
            subscription = data["Item"];
        }
    }).promise();

    if(!subscription){
        throw Error ('no such subscription - ' + subId);
    }

    return subscription;
}

function userReachedMaximumProgramsSwitch(user){
    var date =new Date();
    date.setDate(date.getDate() - 30);
    return user.lastPlanSubstitutionDate > date;
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

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    var params = {
        TableName: userTable,
        Item: user
    };

    await docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

async function removeUserFromCardsPack(cardsPack, username){
    
    console.log("removing user: " + username + " from pack: " +cardsPack.id);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;


    for (var i = 0; i < cardsPack.usersIds.length; i++) {
        if(cardsPack.usersIds == username){
            cardsPack.usersIds.splice(i, 1);
            break;
        }
    }
    
    var cardPackParams = {
        TableName: cardPackTable,
        Key:{
            "id" : cardsPack.id
        },
        Item: cardsPack
    };


    await docClient.put(cardPackParams, function(err, data) {
        if (err) {
            console.error("Unable to update pack with new user. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("updated pack with new user:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

async function removeUserFromAllPacks(user){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var username = user.username;
    var params = {
        TableName : packsTable,
        FilterExpression: "#us contains (username, :username)",
        ExpressionAttributeValues : {   
            ':username' : username
        },
        ExpressionAttributeNames:{
            "#us": "users"
        },
    };
    console.log("searching for number of used packs for - " + user.username);
    
    await docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to read packs. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get packs succeeded:", JSON.stringify(data, null, 2));
            data.Items.forEach(async function(item) {
                await removeUserFromCardsPack(item, user.username);
            });
        }
    }).promise();
}

async function updateMonthlySubscription(user, paymentProgram, transId){
    var monthlySub = {
        id: 1,
        startDate : new Date().toISOString(),
        paymentProvider : "PayPal",
        providerTransactionId : transId,
        subscriptionPlan: paymentProgram
    };

    console.log("updating new subscription in DB");

    user.startPayingSinceDate = user.startPayingSinceDate ? 
                                user.startPayingSinceDate : 
                                new Date().toISOString();

    if(user.subscription && user.subscription.subscriptionPlan && 
        user.subscription.subscriptionPlan.numberOfCardPacks > paymentProgram.numberOfCardPacks){
            user.numberOfUsedPacks = 0;
            await removeUserFromAllPacks(user);
        }
    user.status = "PLAN";
    user.subscription = monthlySub;
    user.lastPlanSubstitutionDate = new Date().toISOString();
    user.updateAt = new Date().toISOString();
    user.numberOfPlansSubstitutions++;
    
    //user.isGroupOwner = paymentProgram.numberOfUsers > 1 ? true : false;

    console.log("user AFTER change: ");
    console.log(user);

    console.log("Adding a new subscription plan to user: " + user.id + "...");
    await saveUser(user);
}
/*
async function createIncognitoGroup(username){
    var name = username + "_Group";
    var userPoolId = env.AUTH_MENTORCARDS91F3DC29_USERPOOLID;
    console.log("Trying to create group in cognito: " + name);

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    var group;
    var params = {
        GroupName: name, 
        UserPoolId: userPoolId
      };

      console.log("Getting group in cognito: " + name);
      await cognitoidentityserviceprovider.getGroup(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } // an error occurred
        else{
            group = data;
        }            
      }).promise();


    if(!group){
        console.log("Creating group in cognito: " + name);

        var params = {
            GroupName: name, 
            UserPoolId: userPoolId, 
            Precedence: 1
          };
          await cognitoidentityserviceprovider.createGroup(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{    
                group = data; 
                console.log(data);     
            }     
          }).promise();
          console.log("Creating group in cognito: " + name);
    }
    else{
        console.log("group " + name + " already exists");
    }

    return name;
}*/
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

async function createGroup(username, subscriptionPlan){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    var id = makeid(10);
    var users = [];
    users.push(username);
    var params = {
        TableName: groupTable,
        Key: {
            "id" : id
        },
        Item: {
            "id": id,
            "groupUsers": users,
            "subscriptionPlan": subscriptionPlan,
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        }
    };

    await docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to create group. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added group:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    }).promise();
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log("event's arguments:");
    var args = event.arguments.input;
    console.log(event.arguments);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);
    var canUpdateProgram = false;
    if(user.groupId){
        var group = await getGroup(user.groupId);
        for(var i = 0; i < group.groupUsers.length ; i++){
            var currUserName = group.groupUsers[i].username;
            if(username == currUserName){
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

    if(!canUpdateProgram){
        throw Error('User Is now authorized to switch program');
    }
    else{
        if(userReachedMaximumProgramsSwitch(user)){
            throw Error ('no more programs switches are allowed');
        }
        
        var subId = args['paymentProgramId'];
        var paymentProgram = await getPaymentProgram(subId);
    
        var transId = args['providerTransactionId'];

        // Update all users in the group with the same program
        if(user.groupId){
            for(var i = 0; i < group.groupUsers.length ; i++){
                var currUserName = group.groupUsers[i].username;
                var currUser = await getUser(currUserName);
                await updateMonthlySubscription(currUser, paymentProgram, transId);
            }
        }
        else{ // No group yet
            if(paymentProgram.numberOfUsers > 1){
                var groupId = await createGroup(username, paymentProgram);
                user.groupId = groupId;
            }
        }
        await updateMonthlySubscription(user, paymentProgram, transId);
    }
    
};