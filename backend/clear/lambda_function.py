import json
import boto3
import traceback
from boto3.dynamodb.conditions import Attr


def lambda_handler(event, context):
    try:
        data = event['queryStringParameters']
        dynamodb = boto3.resource('dynamodb')
        userID = int(data['userID'])
        # delete tasks
        
        table = dynamodb.Table('traceback-tasks')
        resp = table.scan(FilterExpression=Attr('userID').eq(userID))
        data = resp['Items']
        for task in data:
            table.delete_item(Key={
                'userID': int(task['userID']),
                'taskID': int(task['taskID'])
            })
        
        # delete labels
        table = dynamodb.Table('traceback-labels')
        resp = table.scan(FilterExpression=Attr('userID').eq(userID))
        data = resp['Items']
        for label in data:
            table.delete_item(Key={
                'userID': int(label['userID']),
                'labelID': int(label['labelID'])
            })
        
        # delete time logs
        table = dynamodb.Table('traceback-time-logs')
        resp = table.scan(FilterExpression=Attr('userID').eq(userID))
        data = resp['Items']
        for time in data:
            table.delete_item(Key={
                'userID': int(time['userID']),
                'timeID': int(time['timeID'])
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
