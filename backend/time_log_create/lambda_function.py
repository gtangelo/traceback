import json
import boto3
import traceback
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-time-logs')
        resp = table.query(KeyConditionExpression=Key('userID').eq(data['userID']))
        
        time_logs = resp['Items']
        # generate new unique taskID
        timeID = 0
        for time_log in time_logs:
            if time_log['timeID'] > timeID:
                timeID = int(time_log['timeID'])
        timeID += 1
        
        # add new task to database
        table.put_item(Item={
            'userID': data['userID'],
            'timeID': timeID,
            'start': data['start'],
            'end': data['end'],
            'time': data['end'] - data['start']
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps("")
        }
    except:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }