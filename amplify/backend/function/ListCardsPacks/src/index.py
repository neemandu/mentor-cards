import boto3
from botocore.exceptions import ClientError
from dynamodb_json import json_util as json

def lambda_handler(event, context):
    id = event["params"]["querystring"]["id"]
    client = boto3.client('dynamodb')
    item = client.get_item(TableName='CardsPacks', Key={'id': {'S': id}})
    dynamodb_json = json.dumps(item["Item"])
    response = json.loads(dynamodb_json)
    return {
        'statusCode': 200,
        'body': response
    }