/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function getUserByUserName(username){
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

async function getCardsPack(packId) {
    console.log("getCardsPack: " + packId);
    var docClient = new AWS.DynamoDB.DocumentClient();
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    console.log("check against table: " + packsTable);
    var packsParams = {
        TableName: packsTable,
        Key: {
            "id": packId
        }
    };

    var pack;
    await docClient.get(packsParams).promise().then(data => {
        console.log("Get PaymentProgram succeeded:", JSON.stringify(data, null, 2));
        pack = data["Item"];      
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if (!pack) {
        throw Error('no such pack - ' + subId);
    }

    return pack;
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

async function updateMonthlySubscription(user, pack, transId) {
    var sub = {
        id: 1,
        startDate: new Date().toISOString(),
        paymentProvider: "PayPal",
        providerTransactionId: transId,
        subscriptionPlan: pack.subscriptionPlan,
		cancellationDate: null,
        includedCardPacksIds: [pack]
    };

    console.log("updating new subscription in DB");
    user.updatedAt = new Date().toISOString();
    console.log("Adding a new external subscription plan to user: " + user.id + "... pack id: " + pack.id);
	if(!user.externalPacksSubscriptions){
		user.externalPacksSubscriptions = [];
	}
	user.externalPacksSubscriptions.append(sub);
    await saveUser(user);
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });
    console.log('update payment');
    console.log("event's arguments:");
    var args = event.arguments.input;
    console.log(event.arguments);
    var username = event.identity.claims['cognito:username'];
    if (!username) {
        username = event.identity.claims['username'];
    }

    var user = await getUserByUserName(username);
    var packId = args['packId'];
    var pack = await getCardsPack(packId);
    var transId = args['providerTransactionId'];
    console.log('Updating program to updated by user: ' + username);
    await updateMonthlySubscription(user, pack, transId);
};
