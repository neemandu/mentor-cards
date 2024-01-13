const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' }); // Update this to your AWS region
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    if (!event || !event.identity || !event.identity.claims) {
        return { error: "Event or identity claims are not provided" };
    }

    const username = event.identity.claims['username'];
    if (!username) {
        return { error: "Username not found in identity claims" };
    }

    try {
        const queryParams = {
            TableName: 'YourUserTableName', // Replace with your DynamoDB table name
            IndexName: 'YourRefIdAndStatusIndex', // Replace with your GSI name
            KeyConditionExpression: 'refId = :refId and status = :status',
            ExpressionAttributeValues: {
                ':refId': username,
                ':status': 'PLAN'
            }
        };

        const queryResult = await docClient.query(queryParams).promise();
        const users = queryResult.Items;

        let aggregateData = {};

        users.forEach(user => {
            if (user.subscription && user.firstProgramRegistrationDate) {
                const date = new Date(user.firstProgramRegistrationDate);
                const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                const key = `${user.subscription.id}_${yearMonth}`;
                aggregateData[key] = aggregateData[key] || { count: 0, totalPrice: 0 };

                aggregateData[key].count++;
                aggregateData[key].totalPrice += (user.subscription.subscriptionPlan?.fullPrice || 0);
            }
        });

        let responseData = Object.keys(aggregateData).map(key => {
            const [subscriptionId, yearMonth] = key.split('_');
            return {
                subscriptionId,
                yearMonth,
                count: aggregateData[key].count,
                totalPrice: aggregateData[key].totalPrice
            };
        });

        return { data: responseData };
    } catch (error) {
        console.error("Error processing request:", error);
        return { error: "Error processing request: " + error.message };
    }
};
