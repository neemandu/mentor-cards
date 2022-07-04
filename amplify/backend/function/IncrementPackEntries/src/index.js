/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env, ppid } = require("process");
var AWS = require("aws-sdk");

async function incrementPackEntries(cardsPack){
    
    console.log("incrementPackEntries - pack: " + cardsPack.id);
   
    cardsPack.visitorsCounter++;
    console.log("pack: " + cardsPack.id + " new # of visitors: " + cardsPack.visitorsCounter);
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var cardPackParams = {
        TableName: cardPackTable,
        Key:{
            "id" : "" + cardsPack.id
        },
        Item: cardsPack
    };

    await docClient.put(cardPackParams).promise().then(data => {
        console.log("updated pack with new number of visitors:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to update pack with new number of visitors. Error JSON:", JSON.stringify(err, null, 2));
      });

      
}

async function getPack(id){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var packTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    
    var packParams = {
        TableName: packTable,
        Key:{
            "id": "" + id
        }
    };

    console.log("searching for pack - " + id);

    var pack;

    await docClient.get(packParams).promise().then(data => {
        console.log("Get pack succeeded:", JSON.stringify(data, null, 2));
        pack = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!pack){
        throw Error ('no such pack - ' + id);
    }

    return pack;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    var cardsPackId = parseInt(event.arguments.input['cardsPackId']);
    var pack = await getPack(cardsPackId);
    await incrementPackEntries(pack);
    return true;
};
