/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	AUTH_MENTORCARDS91F3DC29_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
require("boto3");

exports.handler = (event) => {
    var AWS = require("aws-sdk");

    var username = event.identity.claims['cognito:username'];

    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

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

    docClient.get(userParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user succeeded:", JSON.stringify(data, null, 2));
            user = data["Item"];
        }
    });

    if(!user){
        throw Error ('no such user - ' + username);
    }

    var subTable = env.API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME;
    var subId = event.arguments['paymentProgramId'];

    var subParams = {
        TableName:subTable,
        Key:{
            "id": subId
        }
    };

    var subscription;
    docClient.get(subParams, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Get user succeeded:", JSON.stringify(data, null, 2));
            subscription = data["Item"];
        }
    });

    if(!subscription){
        throw Error ('no such subscription - ' + subId);
    }

    user.numberOfPlansSubstitutions++;


    var monthlySub = {
        startDate = new Date(),
        paymentProvider = "PayPal",
        subscriptionPlan: subscription
    };

    var params = {
        TableName: userTable,
        Item:{
            "id": username,
            "status": "PLAN",
            "subscription": monthlySub ,
            "numberOfPlansSubstitutions": user.numberOfPlansSubstitutions,
            "lastPlanSubstitutionDate": new Date()
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


    CreateUserGroup(username);



    const data = Item

    return Item;
};

function CreateUserGroup(username){
    var name = username + "_Group";
    var userPoolId = env.AUTH_MENTORCARDS91F3DC29_USERPOOLID;
    console.log("Trying to create group in cognito: " + name);

    response = client.get_group(
        GroupName=name,
        UserPoolId=userPoolId
    );

    if(!response || !response.Group){
        console.log("Creating group in cognito: " + name);
        client = boto3.client('cognito-idp')

        response = client.create_group(
            GroupName=name,
            UserPoolId=env.AUTH_MENTORCARDS91F3DC29_USERPOOLID,
            Precedence=1
        );
    }
    else{
        console.log("group " + name + " already exists");
    }
}