/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

async function getPack(id){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var packTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    
    var packParams = {
        TableName: packTable,
        Key:{
            "id": id
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


async function incrementLikes(cardsPack){
    
    console.log("incrementLikes - pack: " + cardsPack.id);
    cardsPack.likesCounter++;
    var docClient = new AWS.DynamoDB.DocumentClient();

    var cardPackTable = env.API_CARDSPACKS_CARDSPACKTABLE_NAME;

    var cardPackParams = {
        TableName: cardPackTable,
        Key:{
            "id" : cardsPack.id
        },
        Item: cardsPack
    };

    await docClient.put(cardPackParams).promise().then(data => {
        console.log("updated pack with new user:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to update pack with new user. Error JSON:", JSON.stringify(err, null, 2));
      });

      
}

exports.handler = async (event) => {
    var cardsPackId = event.arguments.input['cardsPackId'];
    var pack = await getPack(cardsPackId);
    await incrementLikes(pack);
};
