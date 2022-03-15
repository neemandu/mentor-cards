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

function getBillingEndDate(user) {
    console.log('getBillingEndDate');
    var cycles = user.subscription.subscriptionPlan.billingCycleInMonths;
    console.log('cycles is: ' + cycles);
    var createdAt = new Date(user.subscription.startDate);
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

function shouldSentUpcomingBillingAlert(user){
    var nextBillingCycle = getBillingEndDate(user);
    var now = new Date();
    var Difference_In_Time = nextBillingCycle.getTime() - now.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    console.log('Next billing date: ');
    console.log(nextBillingCycle);
    console.log('Now: ');
    console.log(now);
    console.log('Difference_In_Days: ' + Difference_In_Days);
    if(Difference_In_Days == 7){
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
        ProjectionExpression:"id, subscription, email, fullName, phone",
        KeyConditionExpression: "#st = :status",
        ExpressionAttributeNames:{
            "#st": "status"
        },
        ExpressionAttributeValues: {
            ":status": "PLAN"
        }
    };

    console.log("searching for users with a plan");
    var users = [];
    await docClient.query(userParams).promise().then(data => {
        console.log("Query succeeded.");    
        console.log(data.Items.length);
        data.Items.forEach(function(user) {
            var a = shouldSentUpcomingBillingAlert(user);
            if(a){
                var d = new Date();
                var id = user.email + "_UPCOMING_PAYMENT_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
                var item = {
                    PutRequest: {
                        Item: {
                            "id": id,
                            "email": user.email,
                            "emailDeliveryTime": null,
                            "phone": user.phone,
                            "smsDeliveryTime": null,
                            "emailTemplateId": 5,
                            "createdAt": new Date().toISOString(),
                            "updatedAt": new Date().toISOString(),
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
    var users = await getAllRelevantUsers();
    if(users.length > 0){
        await insertRecordsToMessagingQueue(users);
    }
    else{
        console.log("No users should be notified");
    }
};
