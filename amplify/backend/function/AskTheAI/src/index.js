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

function addGeneralGuidance(prompt){
    return prompt + `. general guidance: you are a therapists that speaks Hebrew, English, Russian, Arabic and Spanish.
    you are an expert in therapeutic cards which are projection cards. when someone ask you something about cards, look through your data base, which is a json file of a list of objects that each one is a different therapeutic card pack in many languages. look through the list and find the best matches of card packs for the need that was raised in the question. always return only card packs from the json, dont invent one yourself. the name of the card pack is under the property "name" in each object in the json array in your files. you can know what pack matches best by reading the description property and the guide book property of each pack. always answer in the language of the question you were asked.
    inside the guidebook property you have different topics and each topic have a sub topic and inside the subtopic you have the questions that you can be asked as therapist.
    the questions you are asked are asked by other therapists who need your advice about choosing the right card pack for their clients .
    always return a response with a json that looks like this:
    {
      generalAnswer: String
      recommendedPacks: [RecommendedPack]
    }
    type RecommendedPack {
      packId: Int
      reason: String
      guide: String
    }
    packId is the "id" property in the pack object you take from your files.
    inside the "guide" property of the response please give examples and suggestions on how to use the card pack, use the "guidebook property and description property to help you with it. try to provide examples that matches the user question need.
    in the json file you have, you have a list of objects like this for example:
    {
            "isHardCopyAvailable": 
            "likesCounter": ,
            "usersUsage": [],
            "name": 
            "language": "",
            "videoUrl": ,
            "cardsPreview": [ ],
            "groupsIds": [],
            "isExternalPack": false,
            "cards": [
                {
                    "cardsImages": [],
                    "categoryName": "-1",
                    "categoryStepNumber": -1
                }
            ],
            "visitorsCounter": 2190,
            "guideBook": [
                {
                    "name": "Ofertas de trabajo individualizado: haga clic aquí para abrir",
                    "subElements": [
                        {
                            "name": "Trabajar con tarjetas en modo visible - para abrir haga clic aquí",
                            
                        }
                    ]
                }
                      "id": "63",
            "tags": [
            ],
            "__typename": "CardsPack",
            "createdAt": "2020-12-22T00:00:00.001Z",
            "imgUrl": "https://master-cards.s3.eu-west-2.amazonaws.com/mask_6.jpg",
            "ownerName": "Mentor-Cards",
            "numberOfCards": -1,
            "backImgUrl": null,
            "categories": [
            ],
            "updatedAt": "2023-01-04T12:09:12.268Z",
            "description": "",
            "topQuestions": [
                "מהי המסכה שדוחפת אותך קדימה?",
                "מהי המסכה שעליה אתה לא מוכן לוותר?",
                "מהי המסכה שאיתה אתה מרגיש הכי בנוח?"
            ],
            "isFree": false,
            "usersIds": [],
            "authorizedDomains": []`;
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
      run.thread_id,
      {
        limit: 2,
        order: "desc"
      }
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
    
    const newprompt = addGeneralGuidance(newQuestion);
    console.log(newprompt);
    //const prompt = generatePrompt(user.AiConversations, newQuestion)

    let response = await getAIResponse(newprompt, user)
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
