import { AWSAppSyncClient } from 'aws-appsync';
import gql from 'graphql-tag';
import 'cross-fetch/polyfill';

const graphqlClient = new AWSAppSyncClient({
  url: 'https://762j67oetrgifg7pt3breun46q.appsync-api.eu-west-2.amazonaws.com/graphql',
  region: process.env.AWS_REGION,
  auth: {
    type: 'AWS_IAM',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN
    }
  },
  disableOffline: true
});

const createUser = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}`;

export async function handler(event) {
  try {
    console.log('start creating user');
    await graphqlClient.mutate({
      createUser,
      variables: {
        input: {
          status: "NOPLAN",
          username: event.userName,
          numberOfPlansSubstitutions: 0,
          numberOfPacksSubstitutions: 0,
          email: event.request.userAttributes.email,
          phone: event.request.userAttributes.phone_number
        }
      }
    });

    
    const body = {
      message: "successfully created user!"
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
    }
  } catch (err) {
    console.log('error creating user: ', err);
  } 
}