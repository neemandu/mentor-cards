var AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider();

const knownProviderNames = {
  google: 'Google',
  facebook: 'Facebook'
};

async function  getProviderName(userPoolId, providerName) {
  if (knownProviderNames[providerName]) {
    return knownProviderNames[providerName];
  }

  const { Providers } = await cognito.listIdentityProviders({ UserPoolId: userPoolId }).promise();
  for (const provider of Providers) {
    if (provider.ProviderName.toLowerCase() === providerName.toLowerCase()) {
      return provider.ProviderName;
    }
  }
}

async function tryMergeUserAccounts (event) {
  console.log(event);
  const { userPoolId, userName } = event;
  const { email } = event.request.userAttributes;
  const [provider, ...providerValues] = userName.split('_');
  const providerValue = providerValues.join('_');

  // merge social provider with existing cognito user by email
  if (provider.length > 0 && providerValue.length > 0) {
    const [{ Users }, providerName] = await Promise.all([
      cognito
        .listUsers({
          UserPoolId: userPoolId,
          AttributesToGet: ['email'],
          Filter: `email = "${email}"`,
          Limit: 1
        })
        .promise(),
      getProviderName(userPoolId, provider)
    ]);

    if (providerName && Users.length > 0) {
      for (const user of Users) {
        await cognito
          .adminLinkProviderForUser({
            UserPoolId: userPoolId,
            DestinationUser: {
              ProviderName: 'Cognito',
              ProviderAttributeValue: user.Username
            },
            SourceUser: {
              ProviderName: providerName,
              ProviderAttributeName: 'Cognito_Subject',
              ProviderAttributeValue: providerValue
            }
          })
          .promise();
      }

      // return true to indicate users were merged
      return true;
    }
  }

  return false;
}

exports.handler = async (event, _, callback) => {
  // Confirm the user
  event.response.autoConfirmUser = true;
  if (event.request.userAttributes.hasOwnProperty("phone_number")) {
    event.response.autoVerifyPhone = true;
  }
  // continue the flow only if did not link providers
  const wereUsersMerged = await tryMergeUserAccounts(event);
  return event;
};