/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, ppid } = require("process");
var AWS = require("aws-sdk");

async function getNumberOfUsedPacks(username){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var numberOfPacks = 0;
    var packsTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    
    var params = {
        TableName : packsTable,
        FilterExpression: "#us contains (category, :category1)",
        ExpressionAttributeValues : {   
            ':username' : username
        },
        ExpressionAttributeNames:{
            "#us": "users"
        },
    };
    console.log("searching for number of used packs for - " + username);

    await docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to read packs. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get packs succeeded:", JSON.stringify(data, null, 2));
            console.log(data);
        }
    }).promise();
}

exports.handler = async (event) => {
    console.log('getCardsImages');
    console.log(event);

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var numberOfPacks = await getNumberOfUsedPacks(username);

    return numberOfPacks;
};
