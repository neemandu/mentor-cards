/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_AFFILIATETABLE_ARN
	API_CARDSPACKS_AFFILIATETABLE_NAME
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { env } = require("process");
const AWS = require('aws-sdk');
AWS.config.update({ region: env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to get all affiliates
async function getAllAffiliates() {
    const params = {
        TableName: env.API_CARDSPACKS_AFFILIATETABLE_NAME,
    };

    let scanResults = [];
    let items;
    do {
        items = await docClient.scan(params).promise();
        items.Items.forEach(item => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
}

// Function to get users by affiliate ID
async function getUsersByAffiliateId(affiliateId) {
    const queryParams = {
        TableName: env.API_CARDSPACKS_USERTABLE_NAME,
        IndexName: 'userMyAffiliateId-index',
        KeyConditionExpression: 'userMyAffiliateId = :affiliateId',
        ExpressionAttributeValues: {
            ':affiliateId': affiliateId
        }
    };

    try {
        const data = await docClient.query(queryParams).promise();
        return data.Items;
    } catch (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        throw new Error(`Error fetching users by affiliate ID: ${err.message}`);
    }
}

// Function to calculate the total payments amount for a user
function calculateTotalPayments(user) {
    if (!user || !user.payments || !Array.isArray(user.payments)) {
        return 0;
    }
    return user.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
}

// Function to calculate the total PastCommisions
function calculateTotalPastCommisions(affiliate) {
    if (!affiliate || !affiliate.withdraws || !Array.isArray(affiliate.withdraws)) {
        return 0;
    }
    return affiliate.withdraws.reduce((sum, payment) => sum + (payment.amount || 0), 0);
}

async function getUsersByAffiliateUrl(id){
    const queryParams = {
        TableName: env.API_CARDSPACKS_USERTABLE_NAME, 
        IndexName: 'refId-index',
        KeyConditionExpression: 'refId = :refId',
        ExpressionAttributeValues: {
            ':refId': id
        }
    };
    var users;
    await docClient.query(queryParams).promise().then(data => {
        users = data["Items"];
        console.log('found ' + users?.length + ' users', JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });



    return users;
}

exports.handler = async (event) => {
    try {
        console.log("get all affiliates");
        const affiliates = await getAllAffiliates();
        if (!affiliates || affiliates.length === 0) {
            return { error: "No affiliates found" };
        }

        console.log("Found " + affiliates.length + " affiliates");
        let results = [];

        for (const affiliate of affiliates) {
            const totalPastCommisions = calculateTotalPastCommisions(affiliate);
            const users = await getUsersByAffiliateUrl(affiliate.affiliateUrl);
            
            console.log("for affiliate " + affiliate.affiliateUrl + " found " + users.length + " users");


            console.log("calculateTotalPayments for affiliate " + affiliate.affiliateUrl);
            const totalPayments = users
            .map(user => user.payments ? user.payments.map(payment => parseFloat(payment.amount)) : [])
            .flat()
            .reduce((total, amount) => total + amount, 0);

            results.push({
                id: affiliate.id,
                affiliateUrl: affiliate.affiliateUrl,
                contactEmail: affiliate.contactEmail,
                phoneNumber: affiliate.phoneNumber,
                websiteURL: affiliate.websiteURL,
                paymentDetails: affiliate.paymentDetails,
                commissionPercentage: affiliate.commissionPercentage,
                dateJoined: affiliate.dateJoined,
                status: affiliate.status,
                balance: (totalPayments * (affiliate.commissionPercentage / 100)) - totalPastCommisions,
                withdraws: affiliate.withdraws,
                createdAt: affiliate.createdAt,
                updatedAt: affiliate.updatedAt
            });
        }

        return results;
    } catch (error) {
        console.error("Error processing request:", error);
        return { error: `Error processing request: ${error.message}` };
    }
};
