/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_AFFILIATETABLE_ARN
	API_CARDSPACKS_AFFILIATETABLE_NAME
	API_CARDSPACKS_CARDSPACKTABLE_ARN
	API_CARDSPACKS_CARDSPACKTABLE_NAME
	API_CARDSPACKS_COMMONLINKTABLE_ARN
	API_CARDSPACKS_COMMONLINKTABLE_NAME
	API_CARDSPACKS_CONTACTUSMODELTABLE_ARN
	API_CARDSPACKS_CONTACTUSMODELTABLE_NAME
	API_CARDSPACKS_COUPONCODESTABLE_ARN
	API_CARDSPACKS_COUPONCODESTABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_GROUPTABLE_ARN
	API_CARDSPACKS_GROUPTABLE_NAME
	API_CARDSPACKS_INVOICESTABLE_ARN
	API_CARDSPACKS_INVOICESTABLE_NAME
	API_CARDSPACKS_MESSAGEQUEUETABLE_ARN
	API_CARDSPACKS_MESSAGEQUEUETABLE_NAME
	API_CARDSPACKS_NEWSTABLE_ARN
	API_CARDSPACKS_NEWSTABLE_NAME
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_ARN
	API_CARDSPACKS_ORGANIZATIONMEMBERSHIPTABLE_NAME
	API_CARDSPACKS_ORGANIZATIONSTABLE_ARN
	API_CARDSPACKS_ORGANIZATIONSTABLE_NAME
	API_CARDSPACKS_RECEIPTSIDTABLE_ARN
	API_CARDSPACKS_RECEIPTSIDTABLE_NAME
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_ARN
	API_CARDSPACKS_SUBSCRIPTIONPLANTABLE_NAME
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
const AWS = require('aws-sdk');
AWS.config.update({ region: env.REGION }); 

const docClient = new AWS.DynamoDB.DocumentClient();

async function updateCardsPackTable() {
	
	try {
	  var tableName = env.API_CARDSPACKS_CARDSPACKTABLE_NAME
	  const params = {
		TableName: tableName
	  };
  
	  const data = await docClient.scan(params).promise();
	  
	  for (const item of data.Items) {
		
		console.log('start item: ' + item.id);
		if (item.cards) {
		  const updatedCards = [
			{
			  categoryName: '-1',
			  categoryStepNumber: -1,
			  cardsImages: item.cards,
			}
		  ];
  
		  const updateParams = {
			TableName: tableName,
			Key: { id: item.id },
			UpdateExpression: 'set cards = :updatedCards',
			ExpressionAttributeValues: {
			  ':updatedCards': updatedCards,
			}
		  };
  
		  await docClient.update(updateParams).promise();
		  console.log('finish item: ' + item.id);
		}
	  }
  
	  console.log('Update completed successfully.');
	} catch (error) {
	  console.error('Error updating the CardsPack table:' + error, JSON.stringify(error, null, 2));
	}
  }

exports.handler = async (event) => {
    console.log(`start`);
    await updateCardsPackTable();
    console.log(`finish`);

};
