/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */const { env } = require("process");
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


function isPackageBelongToUser(id, cardsPacksIds, username) {
    console.log('Checking if package belong to user: ' + username );
    console.log('id: ' + id);
    console.log('cardsPacksIds: ');
    console.log(cardsPacksIds);
    var canView = false;
    if(cardsPacksIds && cardsPacksIds.length > 0){
        for(var i = 0; i < cardsPacksIds.length; i++){
            if(id == cardsPacksIds[i]){
                canView = true;
                console.log('package belong to user ' + username + ': ' + canView);
                break;
            }
        }
    }
    console.log('package does not belong to user ' + username + ': ' + canView);
    return canView;
}

exports.handler = async (event) => {
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    }); 

    var username = event.identity.claims['cognito:email'];
    if(!username){
        username = event.identity.claims['email'];
    }

    var user = await getUser(username);

    if(user &&
        user.couponCodes &&
        user.couponCodes.length > 0){
            for(var i = 0 ; i < user.couponCodes.length ; i++){ 
                if(isPackageBelongToUser(event.source['id'], user.couponCodes[i].allowedCardsPacks, username)){
                    console.log('User has a coupon code with this package');
                    var date = user.couponCodes[i].createdAt;
                    date = new Date(date)
                    date.setDate(date.getDate()+user.couponCodes[i].trialPeriodInDays);
                    return date;
                }
            }
        }
    
        return event.source['freeUntilDate'];
};
