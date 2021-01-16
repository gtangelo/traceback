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
        resp = table.query(KeyConditionExpression=Key('userID').eq(data['userID']))
        
        tasks_list = resp['Items']
        # generate new unique taskID
        taskID = 0
        for task in tasks_list:
            if task['taskID'] > taskID:
                taskID = int(task['taskID'])
        taskID += 1
        
        start = int(datetime.now(tz=timezone.utc).timestamp())
        # add new task to database
        table.put_item(Item={
            'userID': data['userID'],
            'taskID': taskID,
            'labelID': data['labelID'],
            'name': data['name'],
            'description': data['description'],
            'time': data['time'],
            'start': start,
            'active': 1,
            'onPlay': False,
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'taskID': taskID,
                'start': start
            })
        }
    except:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }