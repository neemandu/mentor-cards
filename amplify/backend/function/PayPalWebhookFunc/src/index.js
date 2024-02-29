/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { env } = require("process");
var AWS = require("aws-sdk");
const ses = new AWS.SES();

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id, JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + ". Error JSON:", JSON.stringify(err, null, 2));
        });        
}

async function cancelUserSubscription(user, transaction_id){
    console.log("Canceling user subscription!");

    if(user.providerTransactionId == transaction_id){
        user.status = "NOPLAN";
        user.groupId = null;
        user.groupRole = null;
        user.cancellationDate = new Date().toISOString();
        user.cardsPacksIds = []
       }
    else if(user.providerTransactionId != transaction_id){
        if(user.externalPacksSubscriptions){
            var expSubs = [];
            for(var i= 0; i< user.externalPacksSubscriptions.length; i++){}
            user.externalPacksSubscriptions = user.externalPacksSubscriptions.filter(function( obj ) {
                return obj.providerTransactionId != transaction_id;
            });
        }

    }
    await saveUser(user);
}

function getSubByTxID(user, transaction_id){
    var subscription;
    if(user.providerTransactionId == transaction_id){
        subscription = user.subscription;
    }
    else if(user.providerTransactionId != transaction_id){
        if(user.externalPacksSubscriptions){
            for(var i= 0; i< user.externalPacksSubscriptions.length; i++){
                if(user.externalPacksSubscriptions[i].providerTransactionId == transaction_id){
                    subscription = user.externalPacksSubscriptions[i];
                    break;
                }
            }
        }
    }
    return subscription;
}

async function getUser(id){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
    var userParams = {
        TableName:userTable,
        Key:{
            "id": id
        }
    };

    console.log("searching for user - " + id);

    var user;

    await docClient.get(userParams).promise().then(data => {
        console.log("Get user succeeded:", JSON.stringify(data, null, 2));
        user = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        throw Error ('no such user - ' + id);
    }

    return user;
}

async function getUserByPayPalTxId(transaction_id){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var params = {
        TableName : userTable
    };
    console.log("searching user by paypal transaction id - " + transaction_id);
    var currUser;
    await docClient.scan(params).promise().then(data => {             
        data.Items.forEach(function(user) {
            var subscription = getSubByTxID(user, transaction_id);
            if(subscription){
                currUser = user;
                return;
            }
        });    
    }).catch(err => {
        console.error("Unable to read users. Error JSON:", JSON.stringify(err, null, 2));
    });
    if(!currUser){
        throw Error ('no such user with paypal transaction - ' + transaction_id);
    }
    return currUser;
}

async function addUnsubscribeEmailToMessageQueue(email, phone, fullName) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
    var d = new Date();
    var id = email + "_UNSUBSCRIBE_FROM_PAYPAL_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "email": email,
            "emailDeliveryTime": null,
            "phone": phone,
            "smsDeliveryTime": null,
            "emailTemplateId": 10,
            "name": fullName,
            "params": {
                "name": fullName
            }
        }
    };
    await docClient.put(params).promise().then(data => {
        console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to add Unsubscribe message to: " + email + ". Error JSON:", JSON.stringify(err, null, 2));
      });
}

async function createInvoice(user, amount, transaction_id, subscription){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_INVOICESTABLE_NAME;
    var d = new Date();
    var id = user.id + "_invoice_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    
    var extraDesc = " לערכות הבית ";
    if(subscription?.includedCardPacksIds?.length){
        extraDesc = subscription.includedCardPacksIds[0].name + " לערכת ";
    }
    var subDescription = extraDesc + subscription.subscriptionPlan.description + " מנוי";
    var params = {
        TableName: table,
        Item: {
            "id": id,
            "createdAt": new Date().toISOString(), 
            "businessAddress": "מגלן 4 , כרמית",
            "businessName": "Mentor-Cards",
            "businessPhoneNumber": "0549139859",
            "businessWebsite": "https://www.mentor-cards.com",
            "customerAddress": "",
            "date": new Date().toISOString(),
            "email": user.email,
            "fullName": user.fullName,
            "invoiceType": "קבלה",
            "items": [
             {
              "itemName": subDescription,
              "numberOfItems": 1,
              "pricePerItem": amount
             }
            ],
            "updatedAt": new Date().toISOString()
           }
    };
    await docClient.put(params).promise().then(data => {
        console.log("Added item to invoice queue item:", JSON.stringify(data, null, 2));
      }).catch(err => {
        console.error("Unable to add invoice message to: " + user.email + ". Error JSON:", JSON.stringify(err, null, 2));
      });
}

exports.handler = async (event) => {
    try{
        console.log('PayPal webhook!');
        console.log('event:');
        console.log(event);
        var paypal_body = JSON.parse(event.body);
        var event_type = paypal_body.event_type;
        var transaction_id = "";
        var user_id_mydb = "";
        var shouldProcess = true;
        
        if(event_type == "BILLING.SUBSCRIPTION.CANCELLED"){
            transaction_id = paypal_body.resource.id;

            // Liftetime plan - we should not cancel for our customers.
            if(paypal_body.resource.plan_id == 'P-38W13427H3924681HMVGLNDA'){
                shouldProcess = false;
            }
        }
        if(event_type == "PAYMENT.SALE.COMPLETED"){
            transaction_id = paypal_body.resource.billing_agreement_id;
            user_id_mydb = paypal_body.resource.custom;
        }
        console.log('event_type: ' + event_type);
        console.log('transaction_id: ' + transaction_id);
        console.log('user_id_mydb: ' + user_id_mydb);


        if(shouldProcess){
            var user;
            if(user_id_mydb && user_id_mydb !== ""){
                user = await getUser(user_id_mydb);
            }
            else{
                if(transaction_id != 'I-40UYAVKL9JYM'){
                    user = await getUserByPayPalTxId(transaction_id);
                }
            }

            if(user && event_type == "BILLING.SUBSCRIPTION.CANCELLED"){
                await cancelUserSubscription(user, transaction_id);
                await addUnsubscribeEmailToMessageQueue(user.email, user.phone, user.fullName);
            }
            else if(user && event_type == "PAYMENT.SALE.COMPLETED"){
                var amount = paypal_body.resource.amount.total;
                if(!user.payments){
                    user.payments = [];
                }
                var subscription = getSubByTxID(user, transaction_id);
                var now = new Date().toISOString();
                user.payments.push({
                    id: user.id+"_"+now,
                    date: now,
                    payedMonths: subscription.subscriptionPlan.billingCycleInMonths,
                    amount: amount,
                    currency: paypal_body.resource.amount.currency,
                    paymentWay: "PayPal",
                    transactionId: transaction_id
                });
                await saveUser(user);
                await createInvoice(user, amount, transaction_id, subscription);
            }
        }
        const response = {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    } catch(ex){
        console.error(ex);
        await ses
        .sendEmail({
          Destination: {
            ToAddresses: ["neemandu@gmail.com"],
          },
          Source: "support@mentor-cards.com",
          Message: {
            Subject: { Data: 'Mentor-Cards: ERROR' },
            Body: {
              Text: { Data: `error: ${ex}` },
            },
          },
        })
        .promise();
    }
};