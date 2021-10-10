import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from './lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

// returns title as a key
    const {title} = event.body;
    const now = new Date();
    const auction = {
        id: uuid(),
        title, //if your key and value are same just one is enough. title:tile
        status:'OPEN',
        createdAt:now.toISOString(),
    };
    try {
        await dynamodb.put({
            TableName:process.env.AUCTIONS_TABLENAME,
            Item:auction,
        }).promise();
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }
    return {
        statusCode: 201,
        body: JSON.stringify(auction),
    };
}

export const handler = commonMiddleware(createAuction);
