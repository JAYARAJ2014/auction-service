import { closeAuction } from './lib/closeAuction';
import {getEndedAuctions}  from './lib/getEndedAuctions';
import createError from 'http-errors';

async function processAuctions(event, context) {
    console.log('Proessing auctions');
    try {
        const auctionsToClose = await getEndedAuctions();
        const closePromises = auctionsToClose.map(auction => closeAuction(auction));
        await Promise.all(closePromises);  //close in parallel

        return {closed: closePromises.length};
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }
}
export const handler = processAuctions;