/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_ARN
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env, ppid } = require("process");
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

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id + " as unsubscribed" );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id + " as unsubscribed", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " as unsubscribed. Error JSON:", JSON.stringify(err, null, 2));
        });        
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log('update cards packs');
    console.log("event's arguments:");
    var args = event.arguments.input;
    var cardsPacks = args["cardsPacksIds"];
    console.log(cardsPacks);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }
    console.log('username: ' + username);
    var user = await getUserByUSerName(username);
    if(!user.userOrgMembershipId){
        console.log('user does not belong to any organization');
        throw Error('user does not belong to any organization');
    }
    if(user && 
        user.couponCodes && 
        user.couponCodes.length > 0){   
        for(var i = 0 ; i < user.couponCodes.length ; i++){ 
            if(user.couponCodes[i].couponCodesOrganizationId == user.userOrgMembershipId){
                console.log('User has coupon code with this org');
                console.log('user.couponCodes[i]');
                console.log(user.couponCodes[i]);
                if(user.couponCodes[i].allowedCardsPacks.length > 0){
                    console.log('User already submitted card packs');
                    throw Error('User already submitted card packs');
                }
                else{
                    console.log('User already submitted card packs');
                    user.couponCodes[i].allowedCardsPacks = cardsPacks;
                    user.couponCodes[i].trialPeriodInDays = null;
                    break;
                }
            }
        } 
    }
    console.log('user');
    console.log(user);
    await saveUser(user);
};
