/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_COUPONCODESTABLE_ARN
	API_CARDSPACKS_COUPONCODESTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_ARN
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_NAME
	API_CARDSPACKS_ORGANIZATIONSTABLE_ARN
	API_CARDSPACKS_ORGANIZATIONSTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_COUPONCODESTABLE_ARN
	API_CARDSPACKS_COUPONCODESTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_COUPONCODESTABLE_ARN
	API_CARDSPACKS_COUPONCODESTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
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

async function saveUser(user){
    
    user.updatedAt = new Date().toISOString();
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

async function getCouponCode(couponCode){
    console.log("getCouponCode: " + couponCode);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var couponCodeTable = env.API_CARDSPACKS_COUPONCODESTABLE_NAME;
    
    console.log("check against table: " + couponCodeTable);
    var subParams = {
        TableName:couponCodeTable,
        Key:{
            "id": couponCode
        }
    };

    var couponCodeDb;
    await docClient.get(subParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get getCouponCode succeeded:", JSON.stringify(data, null, 2));
            couponCodeDb = data["Item"];
        }
    }).promise();

    if(!couponCodeDb){
        throw Error ('no such Coupon Code - ' + couponCode);
    }

    return couponCodeDb;
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log('add coupon code');
    console.log("event's arguments:");
    var args = event.arguments.input;
    console.log(event.arguments);
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }
    console.log('username: ' + username);
    var user = await getUserByUSerName(username);

    var couponCode = args['couponCode'];

    if(user && 
        user.couponCodes && 
        user.couponCodes.length > 0){   
        for(var i = 0 ; i < user.couponCodes.length ; i++){ 
            if(user.couponCodes[i].id == couponCode){
                console.warn('Coupon code already used - ' + couponCode);
                throw Error ('Coupon code already in use');
            }
        } 
    }

    if(user){
        var dbCouponCode = await getCouponCode(couponCode);
        if(!dbCouponCode){
            console.warn('no such coupon code - ' + couponCode);
            throw Error ('no such coupon code - ' + couponCode);
        }
        if(!user.couponCodes){
            user.couponCodes = [];
        }
        dbCouponCode.createdAt = new Date().toISOString();
        dbCouponCode.updatedAt = new Date().toISOString();
        user.couponCodes.push(dbCouponCode);
        await saveUser(user); 
    }
    
    return true;
};
