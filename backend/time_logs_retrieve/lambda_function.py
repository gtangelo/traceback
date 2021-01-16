from json import dumps
import boto3
from boto3.dynamodb.conditions import Attr
import traceback
from time import mktime
from datetime import datetime

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-time-logs')
        
        # retrieve all tasks with userID
        userID = int(event['queryStringParameters']['userID'])
        resp = table.scan(FilterExpression=Attr('userID').eq(userID))
        data = resp['Items']
        
        i = 0
        time_logs = []
        while i < len(data):
            log = {}
            log['date'] = int(data[i]['start'])
            log['time'] = int(data[i]['time'])
            j = i + 1
            log_date = datetime.fromtimestamp(int(data[i]['start']) + 39600).date()
            if j < len(data):
                next_date = datetime.fromtimestamp(int(data[j]['start']) + 39600).date()
            else:
                next_date = log_date
            while j < len(data) and str(log_date) == str(next_date):
                log['time'] += int(data[j]['time'])
                j += 1
                if j < len(data):
                    next_date = datetime.fromtimestamp(int(data[j]['start']) + 39600).date()
            time_logs.append(log)
            i = j
        
        return {
            'statusCode': 200,
            'body': dumps({
                'time_logs': time_logs
            }),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }