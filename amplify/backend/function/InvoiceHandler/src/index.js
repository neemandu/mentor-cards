/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	API_RECEIPTSAPI_APIID
	API_RECEIPTSAPI_APINAME
	ENV
	REGION
	STORAGE_INVOICES_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	API_RECEIPTSAPI_APIID
	API_RECEIPTSAPI_APINAME
	ENV
	REGION
	STORAGE_INVOICES_BUCKETNAME
Amplify Params - DO NOT EDIT */
const { env } = require("process");
const https = require('https');
var AWS = require("aws-sdk");

exports.handler = (event) => { 
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName === 'INSERT') {
      //pull off items from stream
      var invoice = {
        id: record.dynamodb.NewImage.id?.S,
        email: record.dynamodb.NewImage.email?.S,
        fullName: record.dynamodb.NewImage.fullName?.S,
        customerAddress: record.dynamodb.NewImage.customerAddress?.S,
        date: new Date(record.dynamodb.NewImage.date?.S).toLocaleDateString(),
        businessName: record.dynamodb.NewImage.businessName?.S,
        businessPhoneNumber: record.dynamodb.NewImage.businessPhoneNumber?.S,
        businessAddress: record.dynamodb.NewImage.businessAddress?.S,
        businessWebsite: record.dynamodb.NewImage.businessWebsite?.S,
        invoiceType: record.dynamodb.NewImage.invoiceType?.S,
        createdAt: record.dynamodb.NewImage.createdAt?.S,
        updatedAt: new Date().toISOString(),
        sequenceNumber: record.dynamodb.SequenceNumber.S,
      };    
      
      let dataString = '';
      
      const req = https.get(env.receiptsUrl, function(res) {
        res.on('data', chunk => {
          dataString += chunk;
        });
        res.on('end', () => {
          invoice.invoiceRunningId = dataString;
          console.log("invoice.invoiceRunningId: " + invoice.invoiceRunningId);
          var items = record.dynamodb.NewImage.items.L;
          invoice.items = [{
            itemName: items[0].M.itemName.S,
            pricePerItem: items[0].M.pricePerItem.N,
            numberOfItems: items[0].M.numberOfItems.N,
          }];
          
          var docClient = new AWS.DynamoDB.DocumentClient();
          var table = env.API_CARDSPACKS_MESSAGEQUEUETABLE_NAME;
          var d = new Date();
          var month = d.getMonth() + 1;
          var id = invoice.email + "_INVOICE_" + invoice.invoiceRunningId + "_" + d.getFullYear() + "_" + month + "_" + d.getDate();
          var final_price = parseFloat(invoice.items[0].pricePerItem) * parseInt(invoice.items[0].numberOfItems);
          var params = {
              TableName:table,
              Item:{
                  "id": id,
                  "email": invoice.email,
                  "emailDeliveryTime": null,
                  "phone": null,
                  "smsDeliveryTime": null,
                  "emailTemplateId": 11,
                  "name": invoice.fullName,
                  "createdAt": new Date().toISOString(),
                  "updatedAt": new Date().toISOString(),
                  "params": {
                    "email": invoice.email,
                    "fullName": invoice.fullName,
                    "customerAddress": invoice.customerAddress,
                    "date": invoice.date,
                    "businessName": invoice.businessName,
                    "businessPhoneNumber": invoice.businessPhoneNumber,
                    "businessAddress": invoice.businessAddress,
                    "businessWebsite": invoice.businessWebsite,
                    "invoiceType": invoice.invoiceType,       
                    "invoiceRunningId": invoice.invoiceRunningId,
                    "item": invoice.items[0].itemName,
                    "item_price": invoice.items[0].pricePerItem,
                    "item_quantity": invoice.items[0].numberOfItems,
                    "final_price": final_price
                  }
              }
          };
          
          docClient.put(params).promise().then(data => {
              console.log("Added item to message queue item:", JSON.stringify(data, null, 2));
          }).catch(err => {
              console.error("Unable to add invoice message to: " + invoice.email + ". Error JSON:", JSON.stringify(err, null, 2));
          });

          invoice.date = record.dynamodb.NewImage.date?.S;
          var table1 = env.API_CARDSPACKS_INVOICESTABLE_NAME;
          var params1 = {
              TableName: table1,
              Item: invoice
          };
          docClient.put(params1).promise().then(data => {
              console.log("updateInvoiceRunningId:", JSON.stringify(data, null, 2));
            }).catch(err => {
              console.error("Unable to updateInvoiceRunningId . Error JSON:", JSON.stringify(err, null, 2));
            });

          
        });
      });
      req.on('error', (e) => {
                console.error(e);
            });
    }});
    console.log('finish');
};
