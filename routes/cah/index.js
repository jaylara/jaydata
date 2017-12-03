
const axios = require('axios');

const cardSets = {
    "base": require('./base'),
    "e1": require('./e1'),
    "e2": require('./e2'),
    "e3": require('./e3'),
    "e4": require('./e4'),
    "e5": require('./e5'),
    "e6": require('./e6'),
    "90s": require('./90s'),
    "greenbox" : require('./greenbox')
};

var errGetCardSets = {
    "err": "This collection is empty",
    "Try query parameter" : "decks",
    "Try query values" : [ "base", "e1", "e2", "e3", "e4", "e5", "e6", "90s", "greenbox" ],
    "More information" : "Use a comma to select more than one value",
    "Example (single deck)" : "?decks=e6",
    "Example (multiple decks)" : "?decks=e6,base,greenbox"
};

var errDrawCards = {
    "err": "This collection is empty",
    "Try query parameter" : "num",
    "Try query values" : [ 1,2,3,4,5,6,7,8,9,10 ],
    "Try query parameter" : "decks",
    "Try query values" : [ "base", "e1", "e2", "e3", "e4", "e5", "e6", "90s", "greenbox" ],
    "More information" : "Use a comma to select more than one value",
    "Example (three cards, single deck)" : "?num=3&decks=e6",
    "Example (two cards, multiple decks)" : "?num=2&decks=e6,base,greenbox"
};

//
//?type=&&decks=CAHe1&decks=CAHe2
function getCardSets(req, res) {
    if(req.query.decks) {
        //if multiple decks were requested
        if(req.query.decks.indexOf(',') > -1)
            res.json(combineCardSets(req.query.decks));

        //if one deck is requested
        if(cardSets[req.query.decks] != null)
            res.json(cardSets[req.query.decks]);
    } // end of if

    else
        res.json(errGetCardSets);
}//end of getCardSets()

//respons with a
function drawCards(req, res) {
    if(req.query.num) {
        var qryDecks = req.query.decks
        var cardSet = {};
        if(qryDecks) {
            //if multiple decks were requested, combine decks. or use single deckl
            if(qryDecks.indexOf(',') > -1)
                cardSet = combineCardSets(qryDecks);
            else if(cardSets[qryDecks] != null)
                cardSet = cardSets[qryDecks];
            else
                res.json(errDrawCards);
        } // end of if
        else
            cardSet = combineCardSets(Object.keys(cardSets));

        var cardMap = createCardMap(cardSet);

        res.json(formatDrawnCards(req.query.num, cardSet,cardMap));
    } // end of if
    else
        res.json(errDrawCards);
} // end of drawCards()

function formatDrawnCards(qty, set, map) {
    var drawnCards = {blackCards: [], whiteCards: []};
    for(var b=0; b <qty; b++) {
        var randomBlackCardIndex = Math.floor(Math.random() * set.blackCards.length);
        var randomBlackCard = set.blackCards[randomBlackCardIndex];
        Object.assign(randomBlackCard,map.blackCards[randomBlackCardIndex]);
        drawnCards.blackCards.push(randomBlackCard);

        for(var w = 0; w < randomBlackCard.pick; w++) {
            var randomWhiteCardIndex = Math.floor(Math.random() * set.whiteCards.length);
            var randomWhiteCard = { text: set.whiteCards[randomWhiteCardIndex] };
            Object.assign(randomWhiteCard,map.whiteCards[randomWhiteCardIndex]);
            drawnCards.whiteCards.push(randomWhiteCard);
        } // end of for

    } // end of for
    return drawnCards;
} // end of formatDrawnCards()

function createCardMap(set) {
    var cardMap = {blackCards: [], whiteCards: []};
    //{edition: "", number: 0, card_id: edition+number}
    set.order.forEach((edition) => {
        set[edition].black.forEach((number) => {
            cardMap.blackCards.push({edition, number, card_id: `${edition}_${number}`});
        });
        set[edition].white.forEach((number) => {
            cardMap.whiteCards.push({edition, number, card_id: `${edition}_${number}`});
        });
    });
    return cardMap;
} // end of createCardMap()

function combineCardSets(decks) {
    var newDeck = {blackCards: [], whiteCards: [], order:[]};
    decks.split(",").forEach((deck) => {
        if(cardSets[deck] != null){
            var currentDeck = cardSets[deck];
            newDeck.blackCards.push(...currentDeck.blackCards);
            newDeck.whiteCards.push(...currentDeck.whiteCards);
            newDeck.order.push(deck);
            newDeck[deck] = currentDeck[deck];
        } // end of if
    });

    if (newDeck.order.length === 0)
        return errGetCardSets;

    return newDeck;
} // end of combineCardSets ()

module.exports = {
    getCardSets,
    drawCards
};
