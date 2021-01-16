import json
import boto3
import traceback

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-tasks')
        table.update_item(
            Key={
                'userID': data['userID'],
                'taskID': data['taskID'],
            },
            UpdateExpression='set #t=:recorded_time',
            ExpressionAttributeValues={
                ':recorded_time': data['time']
            },
            ExpressionAttributeNames={
                "#t": "time"
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps('success'),
        }
    except:
        return {
            'statusCode': 500,
            "body": json.dumps(traceback.format_exc())
        }