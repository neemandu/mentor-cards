const AWS = require('aws-sdk');
const { env } = require("process");
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const bucketName = env.STORAGE_INVOICES_BUCKETNAME; // replace with your bucket name

    const params = {
        Bucket: bucketName,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        const items = data.Contents.map(item => {
            const url = s3.getSignedUrl('getObject', {
                Bucket: bucketName,
                Key: item.Key,
                Expires: 3600
            });
            return {
                key: item.Key,
                data: url
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify(items),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to list items from S3 bucket',
                details: err.message,
            }),
        };
    }
};
