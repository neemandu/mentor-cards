/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, ppid } = require("process");
var AWS = require("aws-sdk");

async function getpacks(language){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;    
    var params = {
        TableName: table,
        IndexName: "language-index",
        KeyConditionExpression: "#st = :language",
        ExpressionAttributeNames:{
            "#st": "language"
        },
        ExpressionAttributeValues: {
            ":language": language
        }
    };

    console.log("searching for packs");
    var packs = [];
    await docClient.query(params).promise().then(data => {
        console.log("Query succeeded.");    
        console.log(data.Items.length);
        packs = data.Items;
        
    }).catch(err => {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    });
    return packs;
}


exports.handler = async (event) => {
    console.log('ListCardsPacksByLanguage');

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const language = event?.arguments?.language ?? "he";
    var packs = await getpacks(language);
    return packs;
};
