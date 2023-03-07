const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const content = streamedItem.dynamodb.NewImage.content.S
      const email = streamedItem.dynamodb.NewImage.email.S
      const name = streamedItem.dynamodb.NewImage.name.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: ["support@mentor-cards.com"],
            },
            Source: "support@mentor-cards.com",
            Message: {
              Subject: { Data: 'Mentor-Cards: New Contact Us!' },
              Body: {
                Text: { Data: `Name: ${name}. Email: ${email}. Content: ${content}` },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}