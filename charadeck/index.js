const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/decks', (_req, res) => {
    res.send(decks);
});

apiRouter.post('/decks/cards/addCard', (req, res) => {
    const {username, card} = req.body;
    addCard(username, card);
    res.status(201);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
})

let decks = {};
function addCard(username, card) {
    if (!decks[username]) {
        decks[username] = [];
    }

    let newCard = {
        chrn: card.charName,
        bd:card.birthday,
        l1: card.likeOne,
        l2: card.likeTwo,
        l3: card.likeThree,
        d1: card.dislikeOne,
        d2: card.dislikeTwo   
    };

    deck[username].push(newCard);
}