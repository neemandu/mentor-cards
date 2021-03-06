/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, ppid } = require("process");
var AWS = require("aws-sdk");
const millisecondsInMonth = 2505600000;

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

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    if(d2.getDate() < d1.getDate()){
        months--;
    }
    return months <= 0 ? 0 : months;
}

function getBillingEndDate(firstProgramRegistrationDate, cancellationDate) {
    console.log('getBillingEndDate');
    console.log('cancellationDate is: ');
    console.log(cancellationDate);
    var monthsDiff = monthDiff(firstProgramRegistrationDate, cancellationDate) + 1;
    var endPaymentDate = new Date(firstProgramRegistrationDate);
    endPaymentDate.setMonth(endPaymentDate.getMonth() + monthsDiff);
    console.log('End of billing cycle dae is: ');
    console.log(endPaymentDate);
    return new Date(endPaymentDate);  
}


function isPackageBelongToUser(usersList, username) {
    console.log('Checking if package belong to user: ' + username);
    var canView = false;
    for(var i = 0; i < usersList.length; i++){
        if(username == usersList[i]){
            canView = true;
            break;
        }
    }
    console.log('package belong to user ' + username + ': ' + canView);
    return canView;
}

function isFreeTrialPeriod(firstDate, allPackagesDate) {
    console.log('isFirstMonth');
    console.log('first Date');
    console.log(firstDate);
    console.log('allPackagesDate');
    console.log(allPackagesDate);
    var first = new Date(firstDate);
    var all = new Date(allPackagesDate);
    if (first > all){
        console.log('Free Trial Period!');
        return true;
    }
    console.log('Not the Free Trial Period');
    return false;
}

exports.handler = async (event) => {
    console.log('getCardsImages');
    console.log(event);

    // user was not identified in cognito
    if(!("identity" in event)){
        return [];
    }

    if(event.identity == null){
        return [];
    }

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);
    var allPackagesDate = new Date();
    var now = new Date();
    var trialPeriodInDays = 30;

    if (user && user.couponCode){
        trialPeriodInDays = user.couponCode.trialPeriodInDays;
    }

    allPackagesDate.setDate(allPackagesDate.getDate()-trialPeriodInDays);
    console.log('allPackagesDate');
    console.log(allPackagesDate);
    console.log('user.firstProgramRegistrationDate');
    console.log(user.firstProgramRegistrationDate);

    if(user &&    // unlimited sunscription
       user.status == "PLAN" &&
       user.subscription && 
       user.subscription.subscriptionPlan && 
       user.subscription.subscriptionPlan.numberOfCardPacks== -1              
    ){
        console.log('Limitless program');
        return event.source['cards'];
    }
    
    var startFreePeriodDate = user.createdAt;
    if(user &&
        user.couponCode){
            console.log('user has a coupon code since - ' + user.couponCode.createdAt);
            startFreePeriodDate = user.couponCode.createdAt;
        }

    if(user &&    // first month from registration
        isFreeTrialPeriod(startFreePeriodDate, allPackagesDate)
     ){
         console.log('first month from registration');
         return event.source['cards'];
     }
    /*if(user &&    // first 30 days all packs are available
       user.status == "PLAN" &&
       isFirstMonth(user.firstProgramRegistrationDate, allPackagesDate)
    ){
        console.log('First Month');
        return event.source['cards'];
    }*/
    if(user && // does the package belong to the user?
       user.status == "PLAN" &&
       isPackageBelongToUser(event.source['usersIds'], username)     
    ){
        console.log('Package belong to user');
        return event.source['cards'];
    }
    if(user &&    // canceled subscription but before billing cycle ended
       user.status == "NOPLAN" && 
       user.cancellationDate != null && 
       now < getBillingEndDate(user.firstProgramRegistrationDate, user.cancellationDate)
    ){
        console.log('getBillingEndDate');
        return event.source['cards'];
    }
    console.log('User ' + username + ' is not authorized to view package: ' + event.source['id']);
    return [];
    
};
