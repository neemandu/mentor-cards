/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	API_RECEIPTSAPI_APIID
	API_RECEIPTSAPI_APINAME
	ENV
	REGION
	STORAGE_INVOICES_BUCKETNAME
Amplify Params - DO NOT EDIT */
const { env, ppid } = require("process");
var apigClientFactory = require("aws-api-gateway-client").default;

function createHtml(){
  const newLocal = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>A simple, clean, and responsive HTML invoice template</title>
  
      <style>
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
  
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(2) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
          text-align: center;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
          text-align: center;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: 2px solid #eee;
          text-align: center;
        }
  
        .invoice-box table tr.total td {
          border-top: none;
          font-weight: bold;
          text-align: center;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td {
          text-align: left;
        }
      </style>
    </head>
  
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    {{invoiceRunningId}} :#{{invoiceType}}<br />
                    {{date}} :תאריך<br />
                  </td>
                  <td class="title">
                  <img src="data:image/png;base64,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" style="width: 100%; max-width: 300px" />
                  </td>
  
  
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    {{businessName}}<br />
                    {{businessAddress}}<br />
                    {{businessPhoneNumber}}<br />
                    {{businessWebsite}}
                  </td>
  
                  <td>
                    {{customerAddress}}<br />
                    {{fullName}}<br />
                    {{email}}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <tr class="heading">
            <td>מחיר</td>
            <td>כמות</td>
            <td>פריט</td>
          </tr>
          <tr class="item last">
            <td>ש"ח {{item_price}}</td>
            <td>{{item_quantity}}</td>
            <td>{{item}}</td>
          </tr>
  
          <tr class="total">
  
            <td class="total">ש"ח {{item_price}} :סה"כ</td>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
  var html = newLocal;
  for (const [key, value] of Object.entries(invoice)) {
    html = html.replace(key, value);
  }
  return html;
}

async function getInvoiceRunningId(){
  
  var apigClient = apigClientFactory.newClient({
    invokeUrl: env.API_RECEIPTSAPI_APINAME
  });

  var pathParams = {};
// Template syntax follows url-template https://www.npmjs.com/package/url-template
  var pathTemplate = '/counter'
  var method = 'GET';
  var additionalParams = {
  };
  var body = {
      //This is where you define the body of the request
  };
  var id = 0;
  apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
      .then(function(result){
        console.log(result);
        id = result;
      }).catch( function(result){
        console.log(result);
    });

  return id;
  }

async function sendInvoiceToEmail(email, fullName, html){

}

exports.handler = event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName === 'INSERT') {
      //pull off items from stream
      var invoice = {
        email: record.dynamodb.NewImage.email.S,
        fullName: record.dynamodb.NewImage.email.S,
        customerAddress: record.dynamodb.NewImage.params.M,
        date: record.dynamodb.NewImage.name.S,
        businessName: record.dynamodb.NewImage.email.S,
        businessPhoneNumber: record.dynamodb.NewImage.params.M,
        businessAddress: record.dynamodb.NewImage.name.S,
        businessWebsite: record.dynamodb.NewImage.email.S,
        invoiceType: record.dynamodb.NewImage.params.M
      }
      invoice.invoiceRunningId = await getInvoiceRunningId();
      var items = record.dynamodb.NewImage.membersEmails.L;
      invoice.item = items[0].M.itemName.S;
      invoice.item_price = items[0].M.pricePerItem.N;
      invoice.item_quantity = items[0].M.numberOfItems.N;
      invoice.html = createHtml(invoice);
      await sendInvoiceToEmail(email, fullName, html);
  }});
  return Promise.resolve('Successfully processed DynamoDB record');
};
