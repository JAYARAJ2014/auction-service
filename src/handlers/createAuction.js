async function createAuction(event, context) {

// returns title as a key
    const {title} = JSON.parse(event.body);
    const now = new Date();
    const auction = {
        title, //if your key and value are same just one is enough. title:tile
        status:'OPEN',
        createdAt:now.toISOString(),
    };
    return {
        statusCode: 201,
        body: JSON.stringify(auction),
    };
}

export const handler = createAuction;