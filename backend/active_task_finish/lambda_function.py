import json
import boto3
import traceback
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-tasks')
        table.update_item(
            Key={
                'userID': data['userID'],
                'taskID': data['taskID']
            },
            UpdateExpression='SET active = :active, #e = :end, #t = :recorded_time',
            ExpressionAttributeValues={
                ':active': 0,
                ':recorded_time': data['time'],
                ':end': int(datetime.now(tz=timezone.utc).timestamp()),
            },
            ExpressionAttributeNames={
                "#t": "time",
                "#e": "end"
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps("")
        }
    except:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }