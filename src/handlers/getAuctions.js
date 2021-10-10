import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
    let acutions;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.AUCTIONS_TABLENAME
            }).promise();

        acutions=result.Items;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError('Something went terribly wrong on our side.Please retry');
    }

    return {
        statusCode: 200,
        body: JSON.stringify(acutions),
    };
}

export const handler = middy(getAuctions)
.use(httpJsonBodyParser())
.use(httpEventNormalizer())
.use(httpErrorHandler());
