/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
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
    var numOfCycles = Math.floor(monthsDiff / cycles) + 1;
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

function getBillingEndDateByUser(startDate, subscriptionPlan, cancellationDate) {
    console.log('getBillingEndDate');
    console.log('cancellationDate is: ');
    console.log(cancellationDate);
    var cycles = subscriptionPlan.billingCycleInMonths;
    console.log('cycles is: ');
    console.log(cycles);
    var createdAt = new Date(startDate);
    console.log('createdAt is: ');
    console.log(createdAt);
    var monthsDiff = monthDiff(createdAt, cancellationDate);
    console.log('monthsDiff is: ');
    console.log(monthsDiff);
    var numOfCycles = Math.floor(monthsDiff / cycles) + 1;
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
    
    console.log('Check if pack is free - id: ' + event.source['id']);
    if("isFree" in event.source &&
        event.source['isFree']){
            console.log('Free Pack!');
            return event.source['cards'];
        }
    console.log('Not a free pack - id: ' + event.source['id']);

    // user was not identified in cognito
    if(!("identity" in event)){
        console.log('no user');
        return [];
    }

    if(event.identity == null){
        console.log('no user');
        return [];
    }
    if(!("claims" in event.identity)){
        console.log('no user');
        return [];
    }

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 

    console.log('Pack Id: ' + event.source['id']);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    console.log('Checking if user is SUPER_USER');
    if(user && 
        (user.groupRole == "SUPER_USER" || 
        user.groupRole == "VIP_USER")){
        console.log('Super user!');
        return event.source['cards'];
    }

    var isExternalPack = event.source['isExternalPack'];
    var now = new Date();
    console.log('Checking freeUntilDate');
    if(user && 'freeUntilDate' in event.source){
        console.log(event.source['freeUntilDate']);
        if((new Date(event.source['freeUntilDate'])) > now){
            console.log('Free Pack for limited time!');
            return event.source['cards'];
        }
    }
    else{
        console.log('dont have freeUntilDate');
    }

    if(user && 
        user.status == "PLAN" &&
        user.subscription &&
        user.subscription.subscriptionPlan &&
        user.subscription.subscriptionPlan.billingCycleInMonths == 12
     ){
         console.log('Yearly plan! they deserve all packs');
         return event.source['cards'];
     }
 
    if(!isExternalPack && user){
        console.log('Checking if its a free trial period');
        var allPackagesDate = new Date();
        var trialPeriodInDays = 14;
        var startFreePeriodDate = user.createdAt;
        console.log('allPackagesDate');
        console.log(allPackagesDate);
        console.log('startFreePeriodDate');
        console.log(startFreePeriodDate); 
        // check trialPeriodInDays coupon code
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
        if(user &&    
            isFreeTrialPeriod(startFreePeriodDate, allPackagesDate)
         ){
             console.log('free trial period');
             return event.source['cards'];
         }
         console.log('Not a free trial period');
    }

            
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

    console.log('External Pack: ' + isExternalPack);
    if(isExternalPack){
        var length = 0;
        if(user.externalPacksSubscriptions){
            length = user.externalPacksSubscriptions.length;
        }
        for(var i = 0 ; i < length ; i++){ 
            var packs = user.externalPacksSubscriptions[i];
            console.log('External Pack');
            for(var j = 0 ; j < packs.includedCardPacksIds.length ; j++){ 
                var pack = packs.includedCardPacksIds[j];
                if(pack.id == event.source['id']){
                    console.log('Found the Pack!');
                    console.log('pack.id: ' + pack.id);
                    console.log('packs.cancellationDate: ' + packs.cancellationDate);
                    var startDate = packs.startDate;
                    var subscriptionPlan = packs.subscriptionPlan;
                    console.log('Check if user canceled but paid for the rest of the period');
                    if(packs.cancellationDate){
                        var endDate = getBillingEndDateByUser(startDate, subscriptionPlan, packs.cancellationDate);
                        if(now < endDate){
                            console.log('now < endDate');
                            return event.source['cards'];
                        }
                        else{
                            console.log('now > endDate');
                        }
                    }
                    else{
                        return event.source['cards'];
                    }
                }
            }
        }
    }

    if(!isExternalPack){
        /* */
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
        /* */
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
    }    
};