/* Amplify Params - DO NOT EDIT
    API_CARDSPACKS_CARDSPACKTABLE_ARN
    API_CARDSPACKS_CARDSPACKTABLE_NAME
    API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    API_CARDSPACKS_GROUPTABLE_ARN
    API_CARDSPACKS_GROUPTABLE_NAME
    API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
    API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
      API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
      API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
    API_CARDSPACKS_USERTABLE_ARN
    API_CARDSPACKS_USERTABLE_NAME
    AUTH_MENTORCARDS91F3DC29_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

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

async function getUserByEmail(email) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;


    var userParams = {
        TableName: userTable,
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
        if (data["Items"] && data["Items"].length > 0) {
            user = data["Items"][0];
        }    
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if (!user) {
        throw Error('no such email - ' + email);
    }

    return user;

}

async function getPaymentProgram(subId) {
    console.log("getPaymentProgram: " + subId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var subTable = env.API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME;

    console.log("check against table: " + subTable);
    var subParams = {
        TableName: subTable,
        Key: {
            "id": subId
        }
    };

    var subscription;
    await docClient.get(subParams).promise().then(data => {
        console.log("Get PaymentProgram succeeded:", JSON.stringify(data, null, 2));
        subscription = data["Item"];      
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if (!subscription) {
        throw Error('no such subscription - ' + subId);
    }

    return subscription;
}

function userReachedMaximumProgramsSwitch(user) {
    return false;
    /*
    var date = new Date();
    date.setDate(date.getDate() - 30);
    return user.lastPlanSubstitutionDate > date;
    */
}

async function getGroup(groupId) {
    console.log("getGroup: " + groupId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;

    console.log("check against table: " + groupTable);
    var groupParams = {
        TableName: groupTable,
        Key: {
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

    if (!group) {
        throw Error('no such Group - ' + groupId);
    }

    return group;
}

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id + " as subscribed" );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id + " as subscribed", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " as unsubscribed. Error JSON:", JSON.stringify(err, null, 2));
        });        
}

async function updateMonthlySubscription(user, paymentProgram, transId) {
    var sub = {
        id: 1,
        startDate: new Date().toISOString(),
        paymentProvider: "PayPal",
        providerTransactionId: transId,
        subscriptionPlan: paymentProgram,
        includedCardPacksIds: []
    };

    console.log("updating new subscription in DB");

    user.cancellationDate = null;

    user.providerTransactionId = transId;

    user.firstProgramRegistrationDate = user.firstProgramRegistrationDate ?
        user.firstProgramRegistrationDate :
        new Date().toISOString();

    if (user.subscription && user.subscription.subscriptionPlan &&
        user.subscription.subscriptionPlan.numberOfCardPacks > paymentProgram.numberOfCardPacks) {
        user.numberOfUsedPacks = 0;
        user.cardsPacksIds = [];
    }
    user.status = "PLAN";
    user.subscription = sub;
    user.lastPlanSubstitutionDate = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
    user.numberOfPlansSubstitutions++;

    //user.isGroupOwner = paymentProgram.numberOfUsers > 1 ? true : false;

    console.log("user AFTER change: ");
    console.log(user);

    console.log("Adding a new subscription plan to user: " + user.id + "...");
    await saveUser(user);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function createGroup(email, subscriptionPlan) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var groupTable = env.API_CARDSPACKS_GROUPTABLE_NAME;
    var id = makeid(10);
    var user = {
        email: email,
        role: "ADMIN"
    };
    var users = [];
    users.push(user);
    var params = {
        TableName: groupTable,
        Key: {
            "id": id
        },
        Item: {
            "id": id,
            "groupUsers": users,
            "subscriptionPlan": subscriptionPlan,
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        }
    };

    await docClient.put(params).promise().then(data => {
        console.log("Added group:", JSON.stringify(data, null, 2));
        }).catch(err => {
            console.error("Unable to updating group. Error JSON:", JSON.stringify(err, null, 2));
        }); 

    return id;
}

async function addNewSubscriptionEmailToMessageQueue(templateId, email, phone, fullName) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_NEW_SUBSCRIPTION_PLAN_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "email": email,
            "emailDeliveryTime": null,
            "phone": phone,
            "smsDeliveryTime": null,
            "emailTemplateId": templateId,
            "name": fullName,
            "params": {
                "name": fullName
            }
        }
    };

    await docClient.put(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
        }).catch(err => {
            console.error("Unable to add _NEW_SUBSCRIPTION_PLAN_ message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
        }); 
}

async function getCardsPack(packId) {
    console.log("getCardsPack: " + packId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    console.log("check against table: " + packsTable);
    var packsParams = {
        TableName: packsTable,
        Key: {
            "id": "" + packId
        }
    };

    var pack;
    await docClient.get(packsParams).promise().then(data => {
        console.log("Get pack succeeded:", JSON.stringify(data, null, 2));
        pack = data["Item"];      
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if (!pack) {
        throw Error('no such pack - ' + packId);
    }

    return pack;
}

async function updateSingleSubscription(user, pack, transId, subId) {
    var subscriptionPlan;
    for(var i =0 ; i< pack.subscriptionPlans.length; i++){
        if(pack.subscriptionPlans[i].id == subId){
            subscriptionPlan = pack.subscriptionPlans[i];
            if(user.status == "PLAN"){
                subscriptionPlan.fullPrice = subscriptionPlan.fullPrice * ((100 - subscriptionPlan.discount)/100);
            }
        }
    }
    var newSub = {
        id: 1,
        startDate: new Date().toISOString(),
        paymentProvider: "PayPal",
        providerTransactionId: transId,
        subscriptionPlan: subscriptionPlan,
		cancellationDate: null,
        includedCardPacksIds: [pack]
    };

    console.log("updating new subscription in DB");
    user.updatedAt = new Date().toISOString();
    console.log("Adding a new external subscription plan to user: " + user.id + "... pack id: " + pack.id);
	if(!user.externalPacksSubscriptions){
		user.externalPacksSubscriptions = [];
	}
    var index = -1;
    for (var i = 0; i < user.externalPacksSubscriptions.length; i++){
        var sub = user.externalPacksSubscriptions[i];
        for(var j = 0; j < sub.includedCardPacksIds.length; j++){
            var packId = sub.includedCardPacksIds[j];
            if(packId.id == pack.id){
                index = i;
            }
        }
    }
    if(index > -1){
        user.externalPacksSubscriptions[index] = newSub;
    }
    else{
        user.externalPacksSubscriptions.push(newSub);
    }
    await saveUser(user);
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log('update payment');
    console.log("event's arguments:");
    var args = event.arguments.input;
    console.log(event.arguments);
    var username = event.identity.claims['cognito:username'];
    if (!username) {
        username = event.identity.claims['username'];
    }

    var user = await getUserByUSerName(username);
    var canUpdateProgram = false;
    if (user.groupRole && user.groupId) {
        if (user.groupRole == "ADMIN" || user.groupRole == "CREATOR") {
            console.log('update payment for group');
            canUpdateProgram = true;
        }
        else {
            console.log('update payment for group but user is not admin');
            canUpdateProgram = false;
        }
    }
    else {
        canUpdateProgram = true;
    }

    if (!canUpdateProgram) {
        throw Error('User is not authorized to switch program');
    }
    else {
        if (userReachedMaximumProgramsSwitch(user)) {
            throw Error('no more programs switches are allowed');
        }

        var subId = args['paymentProgramId'];
        var packId = args['packId'];
        var transId = args['providerTransactionId'];
        if(packId == -1){
            var paymentProgram = await getPaymentProgram(subId);
            // Update all users in the group with the same program
            if (user.groupId) {
                var group = await getGroup(user.groupId);
                for (var i = 0; i < group.groupUsers.length; i++) {
                    var curremail = group.groupUsers[i].email;
                    var currUser = await getUserByEmail(curremail);
                    console.log('checking if user from group is not the updated by user');
                    console.log('updated user: ' + currUser.username);
                    console.log('currnt user: ' + username);
                    if (currUser.username != username) {
                        console.log('Updating program to user user: ' + currUser.username);
                        await updateMonthlySubscription(currUser, paymentProgram, transId);
                    }
                }
            }
            else { // No group yet
                if (paymentProgram.numberOfUsers > 1) {
                    var groupId = await createGroup(user.email, paymentProgram);
                    user.groupId = groupId;
                    user.groupRole = "ADMIN";
                }
            }
            console.log('Updating program to updated by user: ' + username);
            await updateMonthlySubscription(user, paymentProgram, transId);
            var templateId = 7;
            //await addNewSubscriptionEmailToMessageQueue(templateId, user.email, user.phone, user.fullName);
        }
        else{
            var pack = await getCardsPack(packId);
            await updateSingleSubscription(user, pack, transId, subId);
        }
    }
};
