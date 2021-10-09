import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

// returns title as a key
    const {title} = JSON.parse(event.body);
    const now = new Date();
    const auction = {
        id: uuid(),
        title, //if your key and value are same just one is enough. title:tile
        status:'OPEN',
        createdAt:now.toISOString(),
    };
    await dynamodb.put({
        TableName:'AuctionsTable',
        Item:auction,
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(auction),
    };
}

export const handler = createAuction;