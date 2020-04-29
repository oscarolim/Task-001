const youtube = require('./youtube');
const twitch = require('./twitch');
const cache = require('./cache');
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
    youtube(req.params.id, req.params.apikey, cache, res);
});

app.get('/video/:id', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Video ID is required');
    youtube(req.params.id, GOOGLE_APIKEY, cache, res);
});

app.get('/streamer/:name/:apikey', (req, res) => {
    if(req.params.name == '')
        res.status(400).send('Streamer name is required');
    if(req.params.apikey == '')
        res.status(400).send('Twitch Client ID  key is required');
    twitch.stream(req.params.name, req.params.apikey, cache, res);
});

app.get('/streamer/:name', (req, res) => {
    if(req.params.name == '')
        res.status(400).send('Streamer name is required');
    twitch.stream(req.params.name, TWITCH_CLIENT_ID, cache, res);
});

app.get('/streamerById/:id/:apikey', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Streamer ID is required');
    if(req.params.apikey == '')
        res.status(400).send('Twitch Client ID  key is required');
    twitch.streamById(req.params.id, req.params.apikey, cache, res);
});

app.get('/streamerById/:id', (req, res) => {
    if(req.params.id == '')
        res.status(400).send('Streamer ID is required');
    twitch.streamById(req.params.id, TWITCH_CLIENT_ID, cache, res);
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Listening on port ${port}`);