

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let totalImagesCount = 0;
    let cards = event.source['cards'];
    if(cards[0].cardsImages){
        for (const card of cards) {
            totalImagesCount += card.cardsImages.length;
        }
    }
    else{
        totalImagesCount = cards.length;
    }
    return totalImagesCount;
};
