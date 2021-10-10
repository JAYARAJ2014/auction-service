import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
    let auction;
    const {id}=event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: process.env.AUCTIONS_TABLENAME,
            Key: {id}
            }).promise();

            auction=result.Item;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError('Something went terribly wrong on our side.Please retry');
    }

    if(!auction){
        console.log(`Item "${id}" not found`);
        throw new createError.NotFound(`Auction with Id "${id}" not found!`);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(auction),
    };
}

export const handler = commonMiddleware(getAuction);