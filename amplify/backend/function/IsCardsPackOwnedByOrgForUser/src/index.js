/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */const { env } = require("process");
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
        throw Error ('no such user - ' + username);
    }

    return user;
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 
    console.log(event);
    if(event.identity == null){
        return false;
    }  
    if(!("claims" in event.identity)){
        return false;
    } 
    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    if(user.userOrgMembershipId == null){
        return false;
    }
    var id = event.source['id'];
    if(user &&
        user.couponCodes &&
        user.couponCodes.length > 0){
            for(var i = 0 ; i < user.couponCodes.length ; i++){ 
                if(user.userOrgMembershipId == user.couponCodes[i].couponCodesOrganizationId &&
                     user.couponCodes[i].allowedCardsPacks && 
                     user.couponCodes[i].allowedCardsPacks.includes(id)){
                    console.log('User has a coupon code with his org');
                    return true;
                }
            }
        }
    
    return false;
};
