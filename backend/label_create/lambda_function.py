import json
import boto3
import traceback
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('traceback-labels')
        resp = table.query(KeyConditionExpression=Key('userID').eq(data['userID']))
        
        labels = resp['Items']
        # generate new unique labelID
        labelID = 0
        for label in labels:
            if label['labelID'] > labelID:
                labelID = int(label['labelID'])
        labelID += 1

        # add new task to database
        table.put_item(Item={
            'userID': data['userID'],
            'labelID': labelID,
            'colour': data['colour'],
            'name': data['name'],
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'labelID': labelID
            })
        }
    except:
        return {
            'statusCode': 500,
            'body': json.dumps(traceback.format_exc())
        }