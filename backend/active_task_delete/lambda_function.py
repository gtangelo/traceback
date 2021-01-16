import json
import boto3
import traceback
from boto3.dynamodb.conditions import Attr


def lambda_handler(event, context):
    try:
        data = event['queryStringParameters']
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-tasks')
        table.delete_item(Key={
            'userID': int(data['userID']),
            'taskID': int(data['taskID'])
        })

        return {
            'statusCode': 200,
            'body': json.dumps(""),
        }
    except:
        return {
            'statusCode': 500,
            "body": json.dumps(traceback.format_exc())
        }