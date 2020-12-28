/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    var AWS = require("aws-sdk");
    console.log(event); 

    var username = event.identity.claims['cognito:username'];
    var email = event.identity.claims['email'];
    var phone = event.identity.claims['phone_number'];

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = env.API_CARDSPACKS_USERTABLE_NAME;

    var params = {
        TableName:table,
        Item:{
            "id": username,
            "username": username,
            "email": email,
            "phone": phone,
            "cardsPacks": [],
            "status": "NOPLAN",
            "subscription": null ,
            "numberOfPacksSubstitutions": 0,
            "lastPackSubstitutionDate": null,
            "numberOfPlansSubstitutions": 0,
            "lastPlanSubstitutionDate": null,
            "groupId": -1,
            "isGroupOwner": false,
            "groupUsers": []
        }
    };

    console.log("Adding a new user...");

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
            //callback("Failed");
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            //callback(null, data);
        }
    });

    console.log("Done adding a new user...");

    const data = Item

    return Item;
};
