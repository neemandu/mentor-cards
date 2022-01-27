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
    console.log('cancellationDate is: ');
    console.log(user.cancellationDate);
    var cycles = user.subscription.subscriptionPlan.billingCycleInMonths;
    console.log('cycles is: ');
    console.log(cycles);
    var createdAt = new Date(user.subscription.startDate);
    console.log('createdAt is: ');
    console.log(createdAt);
    var monthsDiff = monthDiff(createdAt, user.cancellationDate);
    console.log('monthsDiff is: ');
    console.log(monthsDiff);
    var numOfCycles = Math.ceil(monthsDiff / cycles);
    console.log('numOfCycles is: ');
    console.log(numOfCycles);
    var numberOfMonthsToAdd = numOfCycles * cycles;
    console.log('numberOfMonthsToAdd is: ');
    console.log(numberOfMonthsToAdd);
    var endDate = new Date(createdAt);
    endDate.setMonth(endDate.getMonth()+numberOfMonthsToAdd);
    console.log('endDate is: ');
    console.log(endDate);
    return endDate;
}

function isPackageBelongToUser(id, cardsPacksIds, username) {
    console.log('Checking if package belong to user: ' + username );
    console.log('id: ' + id);
    console.log('cardsPacksIds: ');
    console.log(cardsPacksIds);
    var canView = false;
    if(cardsPacksIds && cardsPacksIds.length > 0){
        for(var i = 0; i < cardsPacksIds.length; i++){
            if(id == cardsPacksIds[i]){
                canView = true;
                console.log('package belong to user ' + username + ': ' + canView);
                break;
            }
        }
    }
    if(!canView){
        console.log('package does not belong to user ' + username + ': ' + canView);
    }
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

exports.handler = async (event, context, callback) => {
    console.log('getCardsImages');
    console.log('event');
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
    var trialPeriodInDays = 14;
    console.log('allPackagesDate');
    console.log(allPackagesDate);
    console.log('user.firstProgramRegistrationDate');
    console.log(user.firstProgramRegistrationDate); 

    console.log('Checking if user is SUPER_USER');
    if(user && user.groupRole == "SUPER_USER"){
        console.log('Super user!');
        return event.source['cards'];
    }

    console.log('Checking if pack is free');
    if(user &&    // Free Pack!
       'freeUntilDate' in event.source &&
       (new Date(event.source['freeUntilDate'])) > now
    ){
        console.log('Free Pack!');
        return event.source['cards'];
    }

    console.log('Not a free plan');
    console.log('Checking Unlimited plan');
    if(user && 
        user.status == "PLAN" &&
        user.subscription &&
        user.subscription.subscriptionPlan &&
        user.subscription.subscriptionPlan.numberOfCardPacks == -1
     ){
         console.log('Unlimited plan');
         return event.source['cards'];
     }

    console.log('Not Unlimited plan');
    var startFreePeriodDate = user.createdAt;
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
    allPackagesDate.setDate(allPackagesDate.getDate()-trialPeriodInDays);
    
    console.log('Checking if its a free trial period');
    if(user &&    
        isFreeTrialPeriod(startFreePeriodDate, allPackagesDate)
     ){
         console.log('free trial period');
         return event.source['cards'];
     }
    
    console.log('Not a free trial period');
    console.log('Checking if user has a coupon code with this package');
    if(user &&
        user.couponCodes &&
        user.couponCodes.length > 0){
            for(var i = 0 ; i < user.couponCodes.length ; i++){ 
                if(isPackageBelongToUser(event.source['id'], user.couponCodes[i].allowedCardsPacks, username)){
                    console.log('User has a coupon code with this package');
                    var date = new Date();
                    date.setDate(user.couponCodes[i].createdAt+user.couponCodes[i].trialPeriodInDays);
                    event.source['freeUntilDate'] = date;
                    return event.source['cards'];
                }
            }
        }
    
    console.log('User does not have a coupon for this pack');
    /*if(user &&    // first 30 days all packs are available
       user.status == "PLAN" &&
       isFirstMonth(user.firstProgramRegistrationDate, allPackagesDate)
    ){
        console.log('First Month');
        return event.source['cards'];
    }*/
    console.log('Check if user own this pack');
    if(user && // does the package belong to the user?
       user.status == "PLAN" &&
       isPackageBelongToUser(event.source['id'], user.cardsPacksIds, username)     
    ){
        console.log('Package belong to user');
        return event.source['cards'];
    }
    console.log('User does not own this pack');

    console.log('Check if user canceled but paid for the rest of the period');
    if(user &&    // canceled subscription but before billing cycle ended
       user.status == "NOPLAN" && 
       user.cancellationDate != null && 
       now < getBillingEndDate(user)
    ){
        console.log('getBillingEndDate');
        return event.source['cards'];
    }
    console.log('User ' + username + ' is not authorized to view package: ' + event.source['id']);
    return [];
    
};