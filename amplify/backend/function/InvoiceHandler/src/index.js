/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["smooveApiKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["smooveApiKey","DigitalSignKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	API_RECEIPTSAPI_APIID
	API_RECEIPTSAPI_APINAME
	ENV
	REGION
	STORAGE_INVOICES_BUCKETNAME
Amplify Params - DO NOT EDIT */
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
const {
  env
} = require("process");
var AWS = require("aws-sdk");
AWS.config.update({
  region: env.REGION
});
//const secretsManager = new AWS.SecretsManager();
const s3 = new AWS.S3();
const path = require('path');
const fs = require('fs');
const https = require('https');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const signpdf = require('@signpdf/signpdf').default;
const { plainAddPlaceholder } = require('@signpdf/placeholder-plain');
const P12Signer = require('@signpdf/signer-p12').P12Signer;
chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

async function generatePDFtoBuffer(htmlContent) {

  console.log(chromium.args);
  var path = await chromium.executablePath();

  const browser = await puppeteer.launch({
      args: [
          ...chromium.args,
          '--disable-gpu',
          '--single-process',
          '--no-zygote',
          '--no-sandbox',
          '--disable-setuid-sandbox',
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: path,
      headless: chromium.headless,
      timeout: 60000
  });
  console.log('launched');
  const page = await browser.newPage();
  console.log('newPage');
  await page.setContent(htmlContent, {
      waitUntil: 'load',
      timeout: 30000
  });
  const pdfBuffer = await page.pdf({
      format: 'A4'
  });
  console.log('setContent');
  await browser.close();
  console.log('close');

  // Generate a digital signature
  let signedPdf = await signPdfBuffer(pdfBuffer);

  return signedPdf;

}

async function signPdfBuffer(pdfBuffer) {
  console.log('Start sign Pdf Buffer');

  const pdfBufferWithPlaceholder = plainAddPlaceholder({
    pdfBuffer: pdfBuffer,
    reason: 'Mentor-Cards - author of this document',
    contactInfo: 'office@mentor-cards.com',
    name: 'Mentor-Cards',
    location: 'Maglan 4, Meitar IL',
    signatureLength: 8192
  });

  console.log('Created a signature placeholder');


  const certificatePath = path.join(__dirname, 'certificate.p12');
  const certificateBuffer = fs.readFileSync(certificatePath);
  console.log('Got the private Key P12');

  // Add signature 
  
  var passphrase = await getParam("passphrase");
  const signer = new P12Signer(certificateBuffer, { passphrase:  passphrase});
  const signedPdf = await signpdf.sign(pdfBufferWithPlaceholder, signer);

  console.log('Finish sign Pdf Buffer');
  return signedPdf;
}

async function createPDFandUpload(name, invoiceRunningId, amount, itemName) {
  console.log('Generating HTML content');
  const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
  }).replace(/ /g, ' ');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <link rel="stylesheet" href="styles.css">
  <style>
      body {
          font-family: Arial, sans-serif;
          padding-inline: auto;
          margin-inline: auto;
          padding-top: 40px;
          /* width: 90vw; */
          width: 210mm;
          height: 297mm;
          border: #eeeeee solid 2px;
          font-size: 1rem;
          padding: 40px;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
      }

      /* @media print {
          body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              background: white;
              font-size: 14px;
              color: black;
          }
      } */

      table {
          width: 100%;
          border-collapse: collapse;
      }

      tr:nth-child(odd) {
          background-color: #f5f5f5;
      }

      th,
      td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          text-align: right;
      }

      th {
          background-color: #ffffff;
          text-align: right;

      }

      .totals {
          text-align: right;
      }

      .footer {
          margin-top: 20px;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          color: #666666;
          margin-top: 20vh;
      }

      .header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
      }

      .header img {
          height: 80px;
          margin-right: 20px;
      }

      .header-info {
          flex-grow: 1;
      }

      .customer-info {
          margin-bottom: 20px;
      }

      .header-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
      }

      .flex {
          display: flex;
      }

      .justify-between {
          justify-content: space-between;
      }

      .justify-end {
          justify-content: flex-end;
      }

      .mx-4 {
          margin-inline: 1rem;
      }

      .mx-8 {
          margin-inline: 2rem;
      }

      .text-right {
          text-align: right;
      }

      .card {
          border-radius: 15px;
          margin: 0 auto;
          border: #eeeeee solid 2px;
          margin-bottom: 20px;
          padding: 8px;
          display: flex;
          justify-items: end;
          justify-content: end;
      }

      p {
          margin: 10px;
      }

      h4 {
          margin: 11px;
      }

      .mt-8 {
          margin-top: 2rem;
      }

      .mt-4 {
          margin-top: 1rem;
      }

      .text-bold {
          font-weight: bold;
      }
  </style>
</head>

<body>
  <div class="content">

      <div class="header-container">
          <div>
              <img src="https://master-cards.s3.eu-west-2.amazonaws.com/Digital_Sign.png" alt="Yozmot Group"
                  height="120px" >
          </div>
          <div class="flex justify-between text-right">
              <div class="mx-4">
                  <h4>&nbsp;</h4>
                  <h4>(מקור) ${invoiceRunningId}</h4>
                  <p>021577911</p>
                  <p>${formattedDate}</p>
              </div>
              <div>
                  <h4>מסמך ממוחשב</h4>
                  <h4>קבלה</h4>
                  <p>:ח.פ</p>
                  <p>:תאריך</p>
              </div>
          </div>
          <div class=" text-right">
              <img src="https://master-cards.s3.eu-west-2.amazonaws.com/new_logo.jpg" alt="mentor cards" height="80px"
                  width="80px">
              <h4>Mentor-Cards</h4>
              <p>טלפון: 0549139859</p>
              <p>office@mentor-cards.com :דוא"ל</p>
          </div>
      </div>
  
      <div class="card">
          <div class=" flex justify-between text-right">
              <div class=" mx-8">
                  <h4>${name}</h4>
              </div>
              <div>
                  <h4>:לכבוד</h4>
              </div>
          </div>
      </div>
  
      <table>
          <tr>
              <th>סה"כ</th>
              <th>כמות</th>
              <th>מחיר יחידה</th>
              <th>פירוט</th>
          </tr>
          <tr>
              <td>₪${amount}</td>
              <td>1</td>
              <td>₪${amount}</td>
              <td>${itemName}</td>
          </tr>
          <tr>
              <td>
                  <div class="text-bold">₪${amount}</div>
              </td>
              <td>
                  <div class="text-bold">סה"כ</div>
              </td>
              <td></td>
          </tr>
      </table>
 
  </div>


  <div class="footer">
      <div>מקור ${invoiceRunningId} - קבלה</div>
      <div>Mentor-Cards הופק ונחתם דיגיטלית באמצעות מערכת // Mentor-Cards כל הזכויות שמורות ל</div>
      <div>עמוד 1 מתוך 1</div>
  </div>
</body>

</html>
    `;

  console.log('Generating PDF');
  try {
      const pdfBuffer = await generatePDFtoBuffer(htmlContent);
      console.log('PDF generated, uploading to S3');

      const s3Url = await uploadToS3(pdfBuffer, `invoice-${name}-${invoiceRunningId}.pdf`);
      console.log('Invoice URL:', s3Url);
      return s3Url; // The S3 URL of the uploaded PDF
  } catch (error) {
      console.error('Error in PDF generation or upload:', error);
      throw error;
  }
}

async function uploadToS3(pdfBuffer, fileName) {
  console.log('STORAGE_INVOICES_BUCKETNAME: ', env.STORAGE_INVOICES_BUCKETNAME);
  console.log('fileName: ', fileName);
  const params = {
      Bucket: env.STORAGE_INVOICES_BUCKETNAME,
      Key: fileName,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ACL: 'public-read'
  };

  try {
      const data = await s3.upload(params).promise();
      console.log('Upload successful: ', data.Location);
      return data.Location;
  } catch (err) {
      console.error('Error uploading to S3:', err);
      throw err;
  }
}

const post = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
  console.log('post payload: ' + payload);
  console.log('post path: ' + path);
  console.log('post defaultOptions: ');
  console.log(defaultOptions);
  const options = {
      ...defaultOptions,
      path,
      method: 'POST'
  };
  const req = https.request(options, res => {
      let buffer = "";
      res.on('data', chunk => buffer += chunk);
      res.on('end', () => {
          var buf = "";
          if (buffer != "") {
              buf = JSON.parse(buffer);
          }
          resolve(buf);
      });
  });
  req.on('error', e => reject(e.message));
  req.write(payload);
  req.end();
});

async function getParam(key) {
  var {
      Parameters
  } = await (new AWS.SSM())
  .getParameters({
          Names: [key].map(secretName => process.env[secretName]),
          WithDecryption: true,
      })
      .promise();

  return Parameters[0].Value;
}

async function updateEmailList(email, amount, subDescription, invoiceRunningId, s3Url) {
  const data = JSON.stringify({
      "email": email,
      "customFields": {
          "i2": "PLAN",
          "i4": subDescription.includes('חודש') ? 1 : (subDescription.includes('שנתי') ? 12 : -1),
          "i6": parseInt(invoiceRunningId),
          "i7": `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
          "i8": amount,
          "i9": s3Url,
          "i10": subDescription,
          "i11": -1
      },
      "lists_ToSubscribe": [927198]
  });

  var bearerToken = await getParam("smooveApiKey");


  const options = {
      hostname: 'rest.smoove.io',
      port: 443,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
      }
  };

  var msg = await post(options, '/v1/Contacts?updateIfExists=true&restoreIfUnsubscribed=true', data);
  console.log('msg');
  console.log(msg);
  console.log("Send Email: sending POST End");
}

async function updateinvoice(invoice) {
  console.log("updating Invoice...");
  var table1 = env.API_CARDSPACKS_INVOICESTABLE_NAME;
  var params1 = {
      TableName: table1,
      Item: invoice
  };
  var docClient = new AWS.DynamoDB.DocumentClient();
  docClient.put(params1).promise().then(data => {
      console.log("updateInvoice:", JSON.stringify(data, null, 2));
  }).catch(err => {
      console.error("Unable to updateInvoice . Error JSON:", JSON.stringify(err, null, 2));
  });
}

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  for (const record of event.Records) {
      console.log(record.eventID);
      console.log(record.eventName);
      console.log('DynamoDB Record: %j', record.dynamodb);
      if (record.eventName === 'INSERT') {
          let invoiceRunningId;
          
          if (record.dynamodb.NewImage.invoiceRunningId?.S) {
              invoiceRunningId = record.dynamodb.NewImage.invoiceRunningId.S;
          } else if (record.dynamodb.NewImage.invoiceRunningId?.N) {
              invoiceRunningId = parseInt(record.dynamodb.NewImage.invoiceRunningId.N, 10);
          }


          var invoice = {
              id: record.dynamodb.NewImage.id?.S,
              email: record.dynamodb.NewImage.email?.S,
              invoiceRunningId: invoiceRunningId,
              fullName: record.dynamodb.NewImage.fullName?.S,
              customerAddress: record.dynamodb.NewImage.customerAddress?.S,
              date: new Date(record.dynamodb.NewImage.date?.S).toISOString(),
              businessName: record.dynamodb.NewImage.businessName?.S,
              businessPhoneNumber: record.dynamodb.NewImage.businessPhoneNumber?.S,
              businessAddress: record.dynamodb.NewImage.businessAddress?.S,
              businessWebsite: record.dynamodb.NewImage.businessWebsite?.S,
              invoiceType: record.dynamodb.NewImage.invoiceType?.S,
              createdAt: record.dynamodb.NewImage.createdAt?.S,
              updatedAt: new Date().toISOString(),
              sequenceNumber: record.dynamodb.SequenceNumber.S,
          };

          var items = record.dynamodb.NewImage.items.L;
          var price;
          if (items[0].M.pricePerItem?.S) {
            price = items[0].M.pricePerItem.S;
          } else if (items[0].M.pricePerItem?.N) {
            price = parseInt(items[0].M.pricePerItem.N, 10);
          }

          invoice.items = [{
              itemName: items[0].M.itemName.S,
              pricePerItem: price,
              numberOfItems: items[0].M.numberOfItems.N,
          }];

          console.log('invoiceRunningId: ' + invoiceRunningId);
          if (invoiceRunningId) {
              console.log('here');
              var subDescription = invoice.items[0].itemName;
              var amount = invoice.items[0].pricePerItem;
              let name = invoice.fullName ? invoice.fullName : invoice.email;
              let s3Url = await createPDFandUpload(name, invoiceRunningId, amount, subDescription)
              invoice.s3Url = s3Url;
              await updateinvoice(invoice);
              await updateEmailList(invoice.email, amount, subDescription, invoiceRunningId, s3Url);
          }
      }
  }
  console.log('finish');
};