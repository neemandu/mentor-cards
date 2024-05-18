/* Amplify Params - DO NOT EDIT
        API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
        API_CARDSPACKS_INVOICESTABLE_ARN
        API_CARDSPACKS_INVOICESTABLE_NAME
        API_CARDSPACKS_USERTABLE_ARN
        API_CARDSPACKS_USERTABLE_NAME
ENV
	REGION
        STORAGE_INVOICES_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
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
const s3 = new AWS.S3();
const https = require('https'); 

async function createPDFandUpload(name, invoiceId, amount, itemName) {
    console.log('Generating HTML content');
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
    body{
        background:#eee;
        margin-top:20px;
    }
    .text-danger strong {
            color: #9f181c;
    }
    .receipt-main {
        background: #ffffff none repeat scroll 0 0;
        border-bottom: 12px solid #333333;
        border-top: 12px solid #9f181c;
        margin-top: 50px;
        margin-bottom: 50px;
        padding: 40px 30px !important;
        position: relative;
        box-shadow: 0 1px 21px #acacac;
        color: #333333;
        font-family: open sans;
    }
    .receipt-main p {
        color: #333333;
        font-family: open sans;
        line-height: 1.42857;
    }
    .receipt-footer h1 {
        font-size: 15px;
        font-weight: 400 !important;
        margin: 0 !important;
    }
    .receipt-main::after {
        background: #414143 none repeat scroll 0 0;
        content: "";
        height: 5px;
        left: 0;
        position: absolute;
        right: 0;
        top: -13px;
    }
    .receipt-main thead {
        background: #414143 none repeat scroll 0 0;
    }
    .receipt-main thead th {
        color:#fff;
    }
    .receipt-right h5 {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 7px 0;
    }
    .receipt-right p {
        font-size: 12px;
        margin: 0px;
    }
    .receipt-right p i {
        text-align: center;
        width: 18px;
    }
    .receipt-main td {
        padding: 9px 20px !important;
    }
    .receipt-main th {
        padding: 13px 20px !important;
    }
    .receipt-main td {
        font-size: 13px;
        font-weight: initial !important;
    }
    .receipt-main td p:last-child {
        margin: 0;
        padding: 0;
    }   
    .receipt-main td h2 {
        font-size: 20px;
        font-weight: 900;
        margin: 0;
        text-transform: uppercase;
    }
    .receipt-header-mid .receipt-left h1 {
        font-weight: 100;
        margin: 34px 0 0;
        text-align: right;
        text-transform: uppercase;
    }
    .receipt-header-mid {
        margin: 24px 0;
        overflow: hidden;
    }
    </style>
    </head>
    <body>
    <div class="col-md-12">   
     <div class="row">
        <div class="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
          <div class="row">    
            <div class="receipt-header">
                <div class="col-xs-6 col-sm-6 col-md-6">
                    <div class="receipt-left">
                        <img class="img-responsive" alt="Mentor-Cards Logo" src="https://master-cards.s3.eu-west-2.amazonaws.com/new_logo.jpg" style="width: 71px; border-radius: 43px;">
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 text-right">
                    <div class="receipt-right">
                        <h5>Mentor-Cards</h5>
                        <p>+972 054-9139859 <i class="fa fa-phone"></i></p>
                        <p>support@mentor-cards.com <i class="fa fa-envelope-o"></i></p>
                        <p>Meitar, Maglan 4. IL <i class="fa fa-location-arrow"></i></p>
                    </div>
                </div>
            </div>
          </div>

          <div class="row">
				<div class="receipt-header receipt-header-mid">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							<h5>${name} </h5>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-left">
							<h3>INVOICE # ${invoiceId}</h3>
						</div>
					</div>
				</div>
            </div>
			
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-md-9">${itemName}</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> ${amount}</td>
                        </tr>
                        <tr>
                           
                            <td class="text-right"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-danger"><h2><strong><i class="fa fa-inr"></i> ${amount}</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							<p><b>Date :</b> ${formattedDate}</p>
							<h5 style="color: rgb(140, 140, 140);">Thanks for shopping.!</h5>
						</div>
					</div>
				</div>
            </div>
        </div>    
    </div>
    </div>
    </body>
    </html>
        `;

    console.log('Generating PDF');
    try {
        const pdfBuffer = await generatePDF(htmlContent);
        console.log('PDF generated, uploading to S3');
        const s3Url = await uploadToS3(pdfBuffer, `invoice-${invoiceId}.pdf`);
        console.log('Invoice URL:', s3Url);
        return s3Url; // The S3 URL of the uploaded PDF
    } catch (error) {
        console.error('Error in PDF generation or upload:', error);
        throw error;
    }
}

async function generatePDF(htmlContent) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'Letter' }).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

async function uploadToS3(pdfBuffer, fileName) {
    const params = {
        Bucket: STORAGE_INVOICES_BUCKETNAME,
        Key: fileName,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
        ACL: 'public-read' 
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('Upload successful:', data.Location);
        return data.Location;
    } catch (err) {
        console.error('Error uploading to S3:', err);
        throw err; 
    }
}

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

async function getParam(){
    var { Parameters } = await (new AWS.SSM())
    .getParameters({
      Names: ["smooveApiKey"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise(); 
    
    console.log('Parameters:');
    console.log(Parameters);
  
    return Parameters[0].Value; 
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

async function addToUnsubscribersList(email) {
    const data = JSON.stringify({
        "email": email,
        "customFields": {
            "i2": "NO_PLAN"
        },
        "lists_ToSubscribe": [927539]
    });

    var bearerToken = await getParam();

    const options = {
        hostname: 'rest.smoove.io',
        port: 443,
        path: '/v1/async/contacts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(data);
    req.end();
}

function getInvoiceId(){
    let dataString = '';
      
    const req = https.get(env.receiptsUrl, function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });
        res.on('end', () => {
          invoice.invoiceRunningId = dataString;

        });
    });
    req.on('error', (e) => {
              console.error(e);
          });
        
    console.log('finish');
}

async function createInvoiceRecord(user, amount, transaction_id, subscription, invoiceId){
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
            "invoiceRunningId": invoiceId,
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

async function updateEmailList(user, amount, transaction_id, subscription, s3Url){
    const data = JSON.stringify({
        "email": user.email,
        "customFields": {
            "i2": "PLAN",
            "i4": subscription.subscriptionPlan.billingCycleInMonths,
            "i6": invoiceId,
            "i7": `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            "i8": amount,
            "i9": s3Url,
            "i10": subscription.subscriptionPlan.name,
            "i11": transaction_id
        },
        "lists_ToSubscribe": [927198]
    });

    var bearerToken = await getParam();

    const options = {
        hostname: 'rest.smoove.io',
        port: 443,
        path: '/v1/async/contacts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(data);
    req.end();
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
            if(!transaction_id){
                transaction_id = paypal_body.resource.id;
            }
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
                user = await getUserByPayPalTxId(transaction_id);
            }

            if(user && event_type == "BILLING.SUBSCRIPTION.CANCELLED"){
                await cancelUserSubscription(user, transaction_id);
                await addToUnsubscribersList(user.email, user.phone, user.fullName);
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
                var invoiceId = getInvoiceId();
                await createInvoiceRecord(user, amount, transaction_id, subscription, invoiceId);
                var subDescription = extraDesc + subscription.subscriptionPlan.description + " מנוי";    
                let s3Url = await createPDFandUpload(user.fullName, invoiceId, amount, subDescription)
                await updateEmailList(user, amount, transaction_id, subscription, invoiceId, s3Url);
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