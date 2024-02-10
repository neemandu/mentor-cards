/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_COMMONLINKTABLE_ARN
	API_CARDSPACKS_COMMONLINKTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env, ppid } = require("process");
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

async function insertToDb(url, username){
    var docClient = new AWS.DynamoDB.DocumentClient();

    const now = new Date();
    now.setHours(now.getHours() + 3);
    
    const item = {
        id: url,
        experationDate: now.toISOString(),
        createdBy: username
    }

    var table = env.API_CARDSPACKS_COMMONLINKTABLE_NAME;
    var params = {
        TableName: table,
        Item: item
    };

    console.log("updating common link " + item.id );

    await docClient.put(params).promise().then(data => {
        console.log("updated common link" + item.id, JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to update common link " + item.id + " . Error JSON:", JSON.stringify(err, null, 2));
        });        
}

function generateRandomString(length) {
    console.log("generateRandomString" );

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("random: " + result );

    return result;
  }

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 

    console.log(`EVENT: ${JSON.stringify(event)}`);
    if(!("identity" in event)){
        return "";
    }

    if(event.identity == null){
        return "";
    }

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    // get the packid
    var packid = event.arguments.input['packId'];

    var user = await getUser(username);

    if(user?.status != "PLAN"){
        return "";
    }

    const randomString = generateRandomString(10);

    const url = packid+"?link="+randomString;

    await insertToDb(url, username);

    return randomString;
};
