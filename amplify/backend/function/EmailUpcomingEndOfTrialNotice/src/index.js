/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

function shouldSentAlert(user){
    var startFreePeriodDate = user.createdAt;
    var trialPeriodInDays = 14;
    if(user &&
        user.couponCodes &&
        user.couponCodes.length > 0){
            for(var i = 0 ; i < user.couponCodes.length ; i++){ 
                if((!user.couponCodes[i].allowedCardsPacks) || (user.couponCodes[i].allowedCardsPacks.length == 0)){
                    var couponDate = user.couponCodes[i].createdAt;
                    if(couponDate > startFreePeriodDate){
                        startFreePeriodDate = couponDate;
                        trialPeriodInDays = user.couponCodes[i].trialPeriodInDays;
                    }
                }
            }
        }  
    var endOfTrialDate = new Date(startFreePeriodDate); 
    endOfTrialDate.setDate(endOfTrialDate.getDate()+trialPeriodInDays);
    var now = new Date();
    var Difference_In_Time = endOfTrialDate.getTime() - now.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    console.log('endOfTrialDate date: ');
    console.log(endOfTrialDate);
    console.log('Now: ');
    console.log(now);
    console.log('Difference_In_Days: ' + Difference_In_Days);
    if(Difference_In_Days == 3){
        console.log('Should send email to: ' + user.email);
        return true;
    }
    console.log('Should not send email to: ' + user.email);
    return false;
}

async function getAllRelevantUsers(){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;    
    var userParams = {
        TableName: userTable,
        IndexName: "status-createdAt-index",
        ProjectionExpression:"id, subscription, email, fullName, phone, couponCodes, createdAt",
        KeyConditionExpression: "#st = :status",
        ExpressionAttributeNames:{
            "#st": "status"
        },
        ExpressionAttributeValues: {
            ":status": "NOPLAN"
        }
    };

    console.log("searching for users with a plan");
    var users = [];
    await docClient.query(userParams).promise().then(data => {
        console.log("Query succeeded.");
        
        console.log(data.Items.length);
        data.Items.forEach(function(user) {
            var a = shouldSentAlert(user);
            if(a){
                var d = new Date();
                var id = user.email + "_UPCOMING_END_OF_TRIAL_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
                var item = {
                    PutRequest: {
                        Item: {
                            "id": id,
                            "email": user.email,
                            "emailDeliveryTime": null,
                            "phone": user.phone,
                            "smsDeliveryTime": null,
                            "emailTemplateId": 4,
                            "name": user.fullName,
                            "params": {
                                "name": user.fullName
                            }
                        }
                    }
                }
                users.push(item);
            }
        });
    }).catch(err => {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    });
    return users;
}

async function insertRecordsToMessagingQueue(users){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var params = {
        RequestItems:{
            [table]: users
        }
    };
    await docClient.batchWrite(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
        console.log("params");
        console.log(params);
        //callback(null, data);
    }).catch(err => {
        console.error("Unable to batchWrite. Error JSON:", JSON.stringify(err, null, 2));
        console.log("params");
        console.log(params);
        //callback("Failed");)
    });
}

exports.handler = async (event) => {
    /*
    var users = await getAllRelevantUsers();
    if(users.length > 0){
        await insertRecordsToMessagingQueue(users);
    }
    else{
        console.log("No users should be notified");
    }*/
};
