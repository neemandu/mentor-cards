exports.handler = (event, context, callback) => {
  console.log('Start post confirm!!!!');
  //console.log(API_CARDSPACKS_GRAPHQLAPIIDOUTPUT);
  //console.log(API_CARDSPACKS_USERTABLE_ARN);
  //console.log(API_CARDSPACKS_USERTABLE_NAME);
  console.log('Finish post confirm!!!!');

 /* var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: REGION});
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  
  var params = {
    TableName: 'CUSTOMER_LIST',
    Item: {
      'CUSTOMER_ID' : {N: '001'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});*/

  callback(null, event);
};
