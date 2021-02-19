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

exports.handler = async (event) => {
    console.log('getCardsImages');
    console.log(event);

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
    var now = new Date();
    var allPackagesDate = new Date();
    allPackagesDate.setDate(allPackagesDate.getDate()-30);
    //var allPackagesDate = new Date(now.getFullYear(),now.getMonth()-1, now.getMonth()-1);
    console.log('allPackagesDate');
    console.log(allPackagesDate);
    console.log('user.startPayingSinceDate');
    console.log(user.startPayingSinceDate);
    var udate = new Date(user.startPayingSinceDate);
    console.log('udate');
    console.log(udate);
    if(user && 
        (   user.subscription && 
            user.subscription.subscriptionPlan && 
            user.subscription.subscriptionPlan.numberOfCardPacks== -1) 
        || 
        (udate > allPackagesDate)){
            return event.source['cards'];
    }

    var usersList = event.source['usersIds'];
    var canView = false;
    for(var i = 0; i < usersList.length; i++){
        if(username == usersList[i]){
            canView = true;
            break;
        }
    }

    if(!canView){
        return [];
    }
    else{
        return event.source['cards'];
    }
};
