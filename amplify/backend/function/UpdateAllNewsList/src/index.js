/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_NEWSTABLE_ARN
	API_CARDSPACKS_NEWSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
var AWS = require("aws-sdk");

async function saveNews(news){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var newsTable = env.API_CARDSPACKS_NEWSTABLE_NAME;
    var updateNewsParams = {
        TableName: newsTable,
        Item: news
    };

    await docClient.put(updateNewsParams, function(err, data) {
        if (err) {
            console.error("Unable to update news. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("updated news.", JSON.stringify(data, null, 2));
        }
    }).promise();
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
    });

    console.log("Update News list");
    console.log("event's arguments:");
    console.log(event.arguments);
    var args = event.arguments.input;
    var newsList = args['news'];
    for(var j = 0 ; j < newsList.length ; j++){  
        news = newsList[j]     
        await saveNews(news);
    }
};
