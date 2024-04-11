const express = require('express');
const app = express();
const config = require('./dbConfig.json');
const db = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { peerProxy } = require('./peerProxy.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const authCookieName = 'token';

app.use(express.json());

app.use(express.static('public'));
app.set('trust proxy', true);
app.use(cookieParser());

var apiRouter = express.Router();

app.use(`/api`, apiRouter);

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
    const user = await db.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});

secureApi.get('/decks/cards/getCards', async (req, res) => {
  const {username} = req.query;

  try {
    const user = await db.getUser(username);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const cards = await db.getDeck(user.user);
    res.status(200).send({cards});
    
  } catch (error){
    console.error('Error getting cards:', error);
    res.status(500).send({ msg: 'Internal server error' });
  }
}); 

secureApi.post('/decks/cards/addCard', async (_req, res) => {
    const { username, card } = _req.body;

    try {
        const user = await db.getUser(username);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        await db.addCard(username, card);

        res.status(201).send({ msg: 'Card added successfully' });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

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

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
