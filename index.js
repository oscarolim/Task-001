const youtube = require('./youtube');
const twitch = require('./twitch');
const express = require('express');
const app = express();

const GOOGLE_APIKEY = 'AIzaSyDySjf8TysRp99bNpIBSTrh3aNmBYNW-Tg';
const TWITCH_CLIENT_ID = 'e7sk7ww82246tvj93i1hqfa6dp5ajf';

app.get('/', (req, res) => {
    let text = "<strong>/video/:id</strong><br />";
    text += "Returns the title, description, channel title and a best guess for the game (if gaming content) for the Youtube video :id<br /><br />";
    text += "<strong>/streamer/:id</strong><br />";
    text += "Returns the streaming status and the game name (if streaming) of the streamer :id";
    res.send(text);
});

app.get('/video/:id', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Video ID is required');
    (async function () {
        let result = await youtube(req.params.id, GOOGLE_APIKEY);
        res.json(result);
    })();
});

app.get('/streamer/:id', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Video ID is required');
    (async function () {
        let result = await twitch(req.params.id, TWITCH_CLIENT_ID);
        res.json(result);
    })();
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Listening on port ${port}`);