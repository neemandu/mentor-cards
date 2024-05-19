/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_RECEIPTSAPI_APINAME
	API_RECEIPTSAPI_APIID
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	receiptsUrl
Amplify Params - DO NOT EDIT */
const { env } = require("process");
var AWS = require("aws-sdk");

function getinvoiceRunningId() {
    return new Promise((resolve, reject) => {
        let dataString = ''; // This variable will accumulate data chunks
        console.log('API_RECEIPTSAPI_APINAME: ' + env.receiptsUrl);
        const req = https.get(env.receiptsUrl, function(res) {
            res.on('data', chunk => {
                dataString += chunk; // Accumulate chunks of data as they arrive
            });
            res.on('end', () => {
                resolve(dataString); // Resolve the promise with the accumulated result when the stream ends
            });
        });
  
        req.on('error', (e) => {
            reject(e); // Reject the promise if there's an error during the request
        });
  
        req.end(); // Ensure the request is properly ended
    });
  }

  async function createInvoiceRecord(invoice){
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = env.API_CARDSPACKS_INVOICESTABLE_NAME;
    var d = new Date();
    if(!invoice.id  || invoice.id == "-1"){
        invoice.id = user.id + "_invoice_" + d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate();
    }
    
    var params = {
        TableName: table,
        Item: {
            "id": invoice.id,
            "createdAt": new Date().toISOString(), 
            "businessAddress": "מגלן 4 , כרמית",
            "businessName": "Mentor-Cards",
            "businessPhoneNumber": "0549139859",
            "businessWebsite": "https://www.mentor-cards.com",
            "customerAddress": invoice.customerAddress,
            "date": invoice.date,
            "email": invoice.email,
            "fullName": invoice.fullName,
            "invoiceType": "קבלה",
            "invoiceRunningId": invoice.invoiceRunningId,
            "items": [
             {
              "itemName": invoice.itemName,
              "numberOfItems": invoice.numberOfItems,
              "pricePerItem": invoice.pricePerItem
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
    AWS.config.update({
        region: env.REGION
        //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
    });

    console.log(`EVENT: ${JSON.stringify(event)}`);
    let invoice = {
        id = event.arguments.input['id'],
        email = event.arguments.input['email'],
        fullName = event.arguments.input['fullName'],
        customerAddress = event.arguments.input['customerAddress'],
        date = event.arguments.input['date'],
        itemName = event.arguments.input['itemName'],
        pricePerItem = event.arguments.input['pricePerItem'],
        numberOfItems = event.arguments.input['numberOfItems'],
        invoiceType = event.arguments.input['invoiceType'],
        s3Url = ""
    }

    invoice.invoiceRunningId = await getinvoiceRunningId();


    await createInvoiceRecord(invoice);


    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
