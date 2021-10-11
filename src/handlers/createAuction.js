import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from './lib/commonMiddleware';
import createError from 'http-errors';
import validator from '@middy/validator';
import createAuctionSchema from './lib/schemas/createAuctionSchema';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

// returns title as a key
    const {title} = event.body;
    const now = new Date();
    const endDate = new Date();
    endDate.setHours(now.getHours()+1);

    const auction = {
        id: uuid(),
        title, //if your key and value are same just one is enough. title:tile
        status:'OPEN',
        createdAt:now.toISOString(),
        endingAt:endDate.toISOString() ,
        highestBid: {
            amount:0,
        }
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

export const handler = commonMiddleware(createAuction)
.use(validator({inputSchema: createAuctionSchema}));
