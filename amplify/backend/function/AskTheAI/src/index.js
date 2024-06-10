/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
	API_CARDSPACKS_USERTABLE_ARN
	API_CARDSPACKS_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import OpenAI from "openai";

const { env } = require("process");
var AWS = require("aws-sdk");

AWS.config.update({
    region: env.REGION
    //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
});

const { Parameters } = await (new AWS.SSM())
  .getParameters({
    Names: ["chatgptsecret","chatgptorg","chatgptproj"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

async function getUser(username){
    var docClient = new AWS.DynamoDB.DocumentClient();

    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;

    
    var userParams = {
        TableName:userTable,
        Key:{
            "id": username
        }
    };

    console.log("searching for user - " + username);

    var user;

    await docClient.get(userParams).promise().then(data => {
        console.log("Get user succeeded:", JSON.stringify(data, null, 2));
        user = data["Item"];
    }).catch(err => {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    });

    if(!user){
        throw Error ('no such user - ' + username);
    }

    return user;
}

function generatePrompt(conversations, newQuestion, username) {
    let prompt = 'I want to give you a list of answers and questions of our conversation and in addition a new question. Your answer should be in the same context as your previous answers.\n\n';

    if (conversations && conversations.length > 0) {
        conversations.forEach(convo => {
            prompt += `Q: ${convo.question}\nA: ${convo.answer}\n`;
        });
    } else {
        prompt += 'There are no previous questions.\n';
    }

    prompt += `\nNew Question: ${newQuestion}`;

    return prompt;
}

async function getAIResponse(prompt, threadId) {
  const chatgptsecret = Parameters.find(param => param.Name === process.env["chatgptsecret"]);
  const chatgptorg = Parameters.find(param => param.Name === process.env["chatgptorg"]);
  const chatgptproj = Parameters.find(param => param.Name === process.env["chatgptproj"]);
  const openai = new OpenAI({
    apiKey: chatgptsecret,
    organization: chatgptorg,
    project: chatgptproj,
  });

  if(!threadId){
      let thread = await openai.beta.threads.create();
      threadId = thread.id;
  }
  console.log("Adding a new message to thread: " + threadId);
  let message = await openai.beta.threads.messages.create(
      threadId=threadId, {
        role: "user",
        content: prompt
      }
    );

  console.log("Running assistant for thread: " + threadId);
  let run = await openai.beta.threads.runs.createAndPoll(
      threadId=threadId,{
        assistantId: "asst_uP8m411Fx1btiLacl8olBcti"
      });

  let messages = [];
  if(run.status == 'completed')
    messages = openai.beta.threads.messages.list(
      threadId=threadId
    );
  return messages;
}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    if(!("identity" in event)){
        return null;
    }

    if(event.identity == null){
        return null;
    }

    var username = event.identity.claims['cognito:username'];
    if(!username){
        username = event.identity.claims['username'];
    }

    var user = await getUser(username);

    var newQuestion = event.arguments.input['question'];

    const prompt = generatePrompt(user.AiConversations, newQuestion)

    getAIResponse(prompt)
    .then(response => {
        console.log("AI Response:");
        console.log(response);
        return response
    })
    .catch(error => {
        console.error(error);
    });
};
