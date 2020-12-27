import os
import json
from pprint import pprint
import boto3
from botocore.exceptions import ClientError

def get_user(userId, dynamodb=None):
    tableName = os.environ['API_CARDSPACKS_USERTABLE_NAME']
    endPoint = os.environ['API_CARDSPACKS_GRAPHQLAPIIDOUTPUT']

    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url=endPoint)

    table = dynamodb.Table(tableName)

    try:
        response = table.get_item(Key={'id': userId})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response['Item']

def handler(event, context):
  print('updateUserResolver')
  print('received event:')
  print(event)
  
  userId = event.arguments.input.id
  oldUser = get_user(userId,)
  

# if!!!!!!! logic!!!!!


  for key in event.arguments.input:
    oldUser[key] = event.arguments.input[key]

  update_item(oldUser)

  return {
    oldUser
  }
