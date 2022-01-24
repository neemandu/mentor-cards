/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_RECEIPTSIDTABLE_ARN
	API_CARDSPACKS_RECEIPTSIDTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function getNextId(){
    var params = {
        TableName: env.API_CARDSPACKS_RECEIPTSIDTABLE_NAME,
        Key:{
            "id": "ids"
        },
        UpdateExpression: 'set #c = #c + :incr',
        ReturnValues: 'UPDATED_NEW',
        ExpressionAttributeNames: {
            '#c' : 'counter'
        },
        ExpressionAttributeValues: {
          ':incr' : 1
        }
      };
      
    var documentClient = new AWS.DynamoDB.DocumentClient();
      
    var id = 0;
    await documentClient.update(params).promise().then(data => {
        id = data.Attributes.counter
    }).catch(e => {
        console.log("Error", e);
    });

    return id;
}

exports.handler = async (event) => {
    var nextId = await getNextId();
    console.log('nextId: ' + nextId);
    const response = {
        statusCode: 200,
        body: nextId,
    };
    return response;
};
