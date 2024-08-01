/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["chatgptsecret","chatgptorg","chatgptproj"].map(secretName => process.env[secretName]),
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
    Names: ["chatgptsecret","chatgptorg","chatgptproj"].map(secretName => process.env[secretName]),
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
    Names: ["chatgptsecret","chatgptorg","chatgptproj"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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

const { env } = require("process");
var AWS = require("aws-sdk");
var OpenAI = require("openai");

AWS.config.update({
    region: env.REGION
    //endpoint: env.API_CARDSPACKS_GRAPHQLAPIIDOUTPUT
});

async function getParams(){
    var { Parameters } = await (new AWS.SSM())
    .getParameters({
      Names: ["chatgptsecret","chatgptorg","chatgptproj"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise(); 
    
  return Parameters; 
}

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

async function getAIResponse(prompt, user) {
  var Parameters = await getParams(); 
  const chatgptsecret = Parameters.find(param => param.Name === process.env["chatgptsecret"]).Value;
  const chatgptorg = Parameters.find(param => param.Name === process.env["chatgptorg"]).Value;
  const chatgptproj = Parameters.find(param => param.Name === process.env["chatgptproj"]).Value;

  console.log('chatgptsecret: ' + chatgptsecret);
  console.log('chatgptorg: ' + chatgptorg);
  console.log('chatgptproj: ' + chatgptproj);
  
  const openai = new OpenAI({
    apiKey: chatgptsecret
  });

  if(!user.AithreadId){
      let thread = await openai.beta.threads.create();
      user.AithreadId = thread.id;
  }
  console.log("Adding a new message to thread: " + user.AithreadId);
  let message = await openai.beta.threads.messages.create(
      threadId=user.AithreadId, {
        role: "user",
        content: prompt
      }
    );

  console.log("Running assistant for thread: " + user.AithreadId);
  
  let run = await openai.beta.threads.runs.createAndPoll(
    user.AithreadId,{
        assistant_id: "asst_IqJ1cIB8YbAfwamgyOTH9txk"
      });

  let messageChosen;
  if (run.status === 'completed') {
    console.log("Finished running assistant for thread: " + user.AithreadId);

    const response  = await openai.beta.threads.messages.list(
      run.thread_id
    );
    for (const message of response.data) {
        console.log("message: ");
        console.log(message);
        console.log(message.content[0].text);
        if(message.role == "assistant"){
            messageChosen = JSON.parse(message.content[0].text.value);
            break;
        }
    }
  }
  console.log("return! ");
  console.log(messageChosen);
  return messageChosen;
}

async function saveUser(user){
    var docClient = new AWS.DynamoDB.DocumentClient();

    user.updatedAt = new Date().toISOString();
    var userTable = env.API_CARDSPACKS_USERTABLE_NAME;
    var updatedUserParams = {
        TableName: userTable,
        Item: user
    };

    console.log("updating user " + user.id + " as unsubscribed" );

    await docClient.put(updatedUserParams).promise().then(data => {
        console.log("updated user " + user.id + " as unsubscribed", JSON.stringify(data, null, 2));
    }).catch(err => {
        console.error("Unable to updating user " + user.id + " as unsubscribed. Error JSON:", JSON.stringify(err, null, 2));
        });        
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

    console.log("AI question:");
    console.log(newQuestion);
    //const prompt = generatePrompt(user.AiConversations, newQuestion)

    let response = await getAIResponse(newQuestion, user)
    let converation = {
        question: newQuestion,
        answer: response,
        date: new Date().toISOString()
    };
    if(user.AiConversations == null){
        user.AiConversations = [];
    }
    user.AiConversations.push(converation);

    // Save the converation and thread id
    await saveUser(user);
    /*var answer = {
        generalAnswer: response.join(" "),
        recommendedPacks: []
    }
    return answer;*/
    return response
};
