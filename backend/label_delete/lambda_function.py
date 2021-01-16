import json
import boto3
import traceback
from boto3.dynamodb.conditions import Attr


def lambda_handler(event, context):
    try:
        data = event['queryStringParameters']
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-labels')
        table.delete_item(Key={
            'userID': int(data['userID']),
            'labelID': int(data['labelID'])
        })
        
        table = dynamodb.Table('traceback-tasks')
        resp = table.scan(FilterExpression=Attr('userID').eq(int(data['userID'])) & Attr('labelID').eq(int(data['labelID'])))
        data = resp['Items']
        table = dynamodb.Table('traceback-tasks')
        for task in data:
            table.update_item(
            Key={
                'userID': task['userID'],
                'taskID': task['taskID'],
            },
            UpdateExpression='set labelID=:none',
            ExpressionAttributeValues={
                ':none': 0
            },
        )

        return {
            'statusCode': 200,
            'body': json.dumps(""),
        }
    except:
        return {
            'statusCode': 500,
            "body": json.dumps(traceback.format_exc())
        }