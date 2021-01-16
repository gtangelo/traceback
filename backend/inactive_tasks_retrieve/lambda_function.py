from json import dumps
import boto3
from boto3.dynamodb.conditions import Attr
import traceback

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-tasks')
        
        # retrieve all tasks with userID
        userID = int(event['queryStringParameters']['userID'])
        resp = table.scan(FilterExpression=Attr('userID').eq(userID) & Attr('active').eq(0))
        data = resp['Items']
        
        # create body json
        tasks_list = []
        for table_task in data:
            task = {}
            task['userID'] = int(table_task['userID'])
            task['taskID'] = int(table_task['taskID'])
            task['labelID'] = int(table_task['labelID'])
            task['name'] = table_task['name']
            task['description'] = table_task['description']
            task['time'] = int(table_task['time'])
            task['start'] = int(table_task['start'])
            task['end'] = int(table_task['end'])
            tasks_list.append(task)
        return {
            'statusCode': 200,
            'body': dumps({
                'tasks_list': tasks_list
            }),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }