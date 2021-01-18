var AWS = require("aws-sdk");

module.exports = class UserRepository{

    constructor(){
    }
   
    
    async saveUser(user){
        var docClient = new AWS.DynamoDB.DocumentClient();

        var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
        var updatedUserParams = {
            TableName: userTable,
            Item: user
        };

        await docClient.put(updatedUserParams, function(err, data) {
            if (err) {
                console.error("Unable to update " + user.id + ". Error JSON:", JSON.stringify(err, null, 2));
                //callback("Failed");
            } else {
                console.log("updated user " + user.id + ".", JSON.stringify(data, null, 2));
                //callback(null, data);
            }
        }).promise();
    }

    async getUserByUSerName(username){
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

        await docClient.get(userParams, function(err, data) {
            if (err) {
                console.log("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Get user succeeded:", JSON.stringify(data, null, 2));
                user = data["Item"];
            }
        }).promise();

        if(!user){
            throw Error ('no such user - ' + username);
        }

        return user;
    }

    async getUserByEmail(email){
        var docClient = new AWS.DynamoDB.DocumentClient();
    
        var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    
        
        var userParams = {
            TableName:userTable,
            IndexName: "email-index",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        };
        var user;
        console.log("searching for user - " + email);
    
        await docClient.query(userParams, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Get user by email succeeded:", JSON.stringify(data, null, 2));
                if(data["Items"] && data["Items"].length > 0){
                    user = data["Items"][0];
                }
            }
        }).promise();
    
        return user;
    
    }
}