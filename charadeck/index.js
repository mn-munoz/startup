const express = require('express');
const app = express();
const config = require('./dbConfig.json');
const db = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const authCookieName = 'token';

app.use(express.json());

app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();

app.use(`/api`, apiRouter);

apiRouter.get('/decks', (_req, res) => {
    res.send(decks);
});

apiRouter.post('/decks/cards/addCard', (req, res) => {
    const {username, card} = req.body;
    addCard(username, card);
    res.status(201).send(decks);
});

apiRouter.get('/config', (_req, res ) => {
    res.send(JSON.stringify(config));
});

apiRouter.post('/auth/create', async (req,res) => {
    if (await db.getUser(req.body.user)) {
        res.status(409).send({ msg: 'User already exists' });
    } else {
        const user = await db.createUser(req.body.user, req.body.pswd);
    
        // Set the cookie
        setAuthCookie(res, user.token);
    
        res.send({
          id: user._id,
        });
      }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await db.getUser(req.body.user);
    console.log(user);
    if (user) {
      if (await bcrypt.compare(req.body.pswd, user.pswd)) {
        console.log('in');
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Wrong username or password' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});


apiRouter.get('/user/', async (req, res) => {
    const user = await db.getUser(req.params.user);
    if (user) {
      const token = req?.cookies.token;
      res.send({ user: user.user, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown User' });
});

let secureApi = express.Router();
apiRouter.use(secureApi);

secureApi.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});

// GetScores
secureApi.get('/scores', async (req, res) => {
    const deck = await db.getDeck();
    res.send(deck);
  });
  


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

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

    decks[username].push(newCard);
}