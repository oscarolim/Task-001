const youtube = require('./youtube');
const twitch = require('./twitch');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    /*let text = "<strong>/video/:id</strong><br />";
    text += "Returns the title, description, channel title and a best guess for the game (if gaming content) for the Youtube video :id<br /><br />";
    text += "<strong>/streamer/:id</strong><br />";
    text += "Returns the streaming status and the game name (if streaming) of the streamer :id";
    res.send(text);*/
    fs.readFile("index.html", function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
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

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Listening on port ${port}`);