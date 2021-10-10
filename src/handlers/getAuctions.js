import AWS from 'aws-sdk';
import commonMiddleware from './lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
    const {status} = event.queryStringParameters;
    console.log(`Status: ${status}`);
    if(!status) {
        throw new createError.BadRequest('status is not provided');
    }

    let auctions;
    const params = {
        TableName: process.env.AUCTIONS_TABLENAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression:  '#status = :status',
        ExpressionAttributeValues: {
          ':status': status,
        },
        ExpressionAttributeNames: {
          '#status': 'status',
        },
      };

    try {
        const result = await dynamodb.query(params).promise();
        auctions=result.Items;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError('Something went terribly wrong on our side.Please retry');
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auctions),
    };
}

export const handler = commonMiddleware(getAuctions);