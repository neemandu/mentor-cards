/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
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

    await docClient.get(userParams).promise().then(data => {
        console.log("Get user succeeded:", JSON.stringify(data, null, 2));
        user = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        console.log('no such user - ' + username);
    }

    return user;         
}

function getBillingEndDateByUser(startDate, subscriptionPlan) {
    console.log('getBillingEndDate');
    var cycles = subscriptionPlan.billingCycleInMonths;
    console.log('cycles isx: ' + cycles);
    var createdAt = new Date(startDate);
    console.log('Subscription started at: ');
    console.log(createdAt);
    var now = new Date();
    var monthsDiff = monthDiff(createdAt, now);
    console.log('monthsDiff is: ' + monthsDiff);
    var numOfCycles = Math.floor(monthsDiff / cycles) + 1;
    console.log('numOfCycles is: ' + numOfCycles);
    var numberOfMonthsToAdd = numOfCycles * cycles;
    console.log('numberOfMonthsToAdd is: ' + numberOfMonthsToAdd);
    var endDate = new Date(createdAt);
    endDate.setMonth(endDate.getMonth()+numberOfMonthsToAdd);
    console.log('endDate is: ');
    console.log(endDate);
    return endDate;
}

function monthDiff(d1, d2) {
    var months;
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    if(date2.getDate() < date1.getDate()){
        months--;
    }
    return months <= 0 ? 0 : months;
}

async function addWelcomeEmailToMessageQueue(email, phone, fullName){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_WELCOME_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName:table,
        Item:{
            "id": id,
            "email": email,
            "emailDeliveryTime": null,
            "phone": phone,
            "smsDeliveryTime": null,
            "emailTemplateId": 1,
            "name": fullName,
            "params": {
                "name": fullName
            }
        }
    };

    await docClient.put(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to add welcome message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
    });
}

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id, JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " . Error JSON:", JSON.stringify(err, null, 2));
        });        
}

exports.handler = async (event) => {
    var username = event.arguments.input['username'];
    var email = event.arguments.input['email'];
    var phone = event.arguments.input['phone'];
    var fullName = event.arguments.input['fullName'];
    var refId = event.arguments.input['affiliateId'];

    console.log(event);
    console.log('Adding new user:');
    console.log(username);
    console.log(email);
    console.log(phone);
    console.log(fullName);
    console.log(refId);

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var user = await getUser(username);
if(!refId){
        refId = "NoRef"
    }
    if(!user){

        console.log('user ' + email + " was NOT found");
        
        var tid = "Empty_" + username;
        var userToInsert = {
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
            "providerTransactionId": tid,
            "fullName": fullName,
            "favouritePacks": [],
            "entries": 1,
            "externalPacksSubscriptions":[],
            "entryDates":[new Date().toISOString()],
            "refId": refId,
            "payments": []
        };
    
        console.log("Adding a new user...");
        await saveUser(userToInsert);

        //await addWelcomeEmailToMessageQueue(email, phone, fullName);
    
        console.log("Done adding a new user...");

        return userToInsert;
    }
    if(user.externalPacksSubscriptions){
        for(var i = 0; i < user.externalPacksSubscriptions.length; i++){
            var endDate = null;
            if(user.externalPacksSubscriptions[i].cancellationDate == null){
                console.log("Not canceled endDate");
                endDate = getBillingEndDateByUser(user.externalPacksSubscriptions[i].startDate,
                    user.externalPacksSubscriptions[i].subscriptionPlan);                   
                console.log(endDate);
                user.externalPacksSubscriptions[i].nextBillingDate = endDate.toISOString();
            }
            else{                 
                console.log('user canceled pack');
                user.externalPacksSubscriptions[i].nextBillingDate = null;
            }
        }
    }
    var subEndDate = null;
    if(user.subscription){
        if(!user.subscription.cancellationDate){
            console.log('sub is not canceled');
            subEndDate = getBillingEndDateByUser(user.subscription.startDate,
                user.subscription.subscriptionPlan);
            user.subscription.nextBillingDate = subEndDate.toISOString();
        }
        else{
            console.log('sub is canceled');
            user.subscription.nextBillingDate = null;
        }
    }
    if(!user.entries){
        user.entries = 0;
    }
    if(!user.entryDates){
        user.entryDates = [];
    }

    user.entries++;
    user.entryDates.push(new Date().toISOString());
if(!user.refId || user.refId == "NoRef"){
        user.refId = refId;
    }
    await saveUser(user);
    console.log('user ' + email + " was found");
    console.log(user);
    return user;
    
};