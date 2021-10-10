import getEndedAuctions from './lib/getEndedAuctions';

async function processAuctions(event, context) {
    console.log('Proessing auctions');
    const autctionsToClose = await getEndedAuctions();
    console.log(autctionsToClose);
}

export const handler = processAuctions;