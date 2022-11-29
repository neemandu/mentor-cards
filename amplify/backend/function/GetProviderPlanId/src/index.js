/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env } = require("process");
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

function noPlan(plans){
    for(var i =0 ;i < plans.length; i++){
        if(plans[i].subscriptionProviderPlanId){
            plans[i].subscriptionProviderPlanId = plans[i].providerPlanId;
        }
    }
    return plans;
}

function plan(plans){
    for(var i =0 ;i < plans.length; i++){
        if(plans[i].subscriptionProviderPlanId){
            plans[i].providerPlanId = plans[i].subscriptionProviderPlanId;
        }
    }
    return plans;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('Get Provider Plan ID');
    console.log('event');
    console.log(event);
    var plans = event.source['subscriptionPlans'];
    if(typeof plans === 'undefined'){
        return [];
    }
    // user was not identified in cognito
    if((!("identity" in event)) || (event.identity == null)){
        return noPlan(plans);
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
    if(!user){
        return noPlan(plans);
    }
    else{
        if(user.status == 'PLAN'){
            return plan(plans);
        }
        else{
            return noPlan(plans);
        }
    }
};
