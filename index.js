const youtube = require('./youtube');
const twitch = require('./twitch');
const express = require('express');
const app = express();
const path = require('path');

/* API KEYS */
const GOOGLE_APIKEY = '';
const TWITCH_CLIENT_ID = '';
/*****/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/video/:id/:apikey', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Video ID is required');
    if(req.params.apikey == '')
        res.status(400).send('Google API key is required');
    (async function () {
        let result = await youtube(req.params.id, req.params.apikey);
        res.json(result);
    })();
});

app.get('/video/:id', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Video ID is required');
    (async function () {
        let result = await youtube(req.params.id, GOOGLE_APIKEY);
        res.json(result);
    })();
});

app.get('/streamer/:name/:apikey', (req, res) => {
    if(req.params.name == '')
        res.status(400).send('Streamer name is required');
    if(req.params.apikey == '')
        res.status(400).send('Twitch Client ID  key is required');
    (async function () {
        let result = await twitch(req.params.name, req.params.apikey);
        res.json(result);
    })();
});

app.get('/streamer/:name', (req, res) => {
    if(req.params.name == '')
        res.status(400).send('Streamer name is required');
    (async function () {
        let result = await twitch(req.params.name, TWITCH_CLIENT_ID);
        res.json(result);
    })();
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Listening on port ${port}`);