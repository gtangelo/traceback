import json
import boto3
from boto3.dynamodb.conditions import Attr
import traceback

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-tasks')
        tasks_list = json.loads(event["body"])['tasks_list']

        # create body json
        for task in tasks_list:
            table.update_item(
                Key={
                    'userID': task['userID'],
                    'taskID': task['taskID'],
                },
                UpdateExpression='set #t=:new_time, onPlay=:play',
                ExpressionAttributeValues={
                    ':new_time': task['time'],
                    ':play': task['onPlay']
                },
                ExpressionAttributeNames={
                    "#t": "time"
                }
            )

        return {
            'statusCode': 200,
            'body': json.dumps(tasks_list),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }