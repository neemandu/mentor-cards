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

async function getOrgMembership(id){
    console.log("getOrgMembership: " + id);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var orgTable = env.API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_NAME;
    
    console.log("check against table: " + orgTable);
    var subParams = {
        TableName:orgTable,
        Key:{
            "id": id
        }
    };

    var org;
    await docClient.get(subParams).promise().then(data => {
        console.log("Get getOrgMembership succeeded:", JSON.stringify(data, null, 2));
        org = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!org){
        console.log('no such org - ' + id);
    }

    return org;
}

async function getOrgByCode(couponCode){
    console.log("getOrgByCode: " + couponCode);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var orgTable = env.API_CARDSPACKS_ORGANIZATIONSTABLE_NAME;
    
    console.log("check against table: " + orgTable);
    var subParams = {
        TableName:orgTable,
        Key:{
            "id": couponCode
        }
    };

    var org;
    await docClient.get(subParams).promise().then(data => {
        console.log("Get getOrgByCode succeeded:", JSON.stringify(data, null, 2));
        org = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!org){
        console.log('no such org - ' + couponCode);
    }

    return org;
}

function isUserBelongToOrg(org, email){
    for(var i = 0 ; i < org.length ; i++){ 
        var x = org[i];
        console.log(x);
        if (x.toLowerCase() === email.toLowerCase()){
            return true;
        }
    }
    return false;
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
    await docClient.get(subParams).promise().then(data => {
        console.log("Get getCouponCode succeeded:", JSON.stringify(data, null, 2));
            couponCodeDb = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

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

    var organization = await getOrgByCode(couponCode);
    var isUserBelong = true;
    if(couponCode != 'wb_220922'){
        isUserBelong = isUserBelongToOrg(organization.membersEmails, user.email);
    }
    if(!isUserBelong){
        console.log('User: ' + user.email + " does not belong to organization: " + couponCode);
        throw Error ('Not in organization');
    }
    else{
        user.userOrgMembershipId = organization.organizationsMembershipId;
    }
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

    if(organization){
        var orgMembership = await getOrgMembership(organization.organizationsMembershipId);
        return orgMembership.about;
    }

    return null;
};
