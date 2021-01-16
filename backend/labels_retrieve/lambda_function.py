from json import dumps
import boto3
from boto3.dynamodb.conditions import Attr
import traceback

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-labels')
        
        # retrieve all tasks with userID
        userID = int(event['queryStringParameters']['userID'])
        resp = table.scan(FilterExpression=Attr('userID').eq(userID))
        data = resp['Items']
        
        # create body json
        labels = []
        for table_label in data:
            label = {}
            label['userID'] = int(table_label['userID'])
            label['labelID'] = int(table_label['labelID'])
            label['name'] = table_label['name']
            label['colour'] = table_label['colour']
            labels.append(label)
        return {
            'statusCode': 200,
            'body': dumps({
                'labels': labels
            }),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }