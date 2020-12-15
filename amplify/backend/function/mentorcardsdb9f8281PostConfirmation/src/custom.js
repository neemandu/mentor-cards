const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createUser = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}`;

exports.handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT
      },
      data: {
        query: print(createUser),
        variables: {
          input: {
            status: "NOPLAN",
            username: event.userName,
            numberOfPlansSubstitutions: 0,
            numberOfPacksSubstitutions: 0,
            email: event.request.userAttributes.email,
            phone: event.request.userAttributes.phone
          }
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
    console.log('error creating todo: ', err);
  } 
}