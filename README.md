# Task-001
Task for a job position

Using Node.js, I had to create an API with two endpoints. One would receive a Youtube video ID and would return information about it. The other would receive a Twitch ID and return information about the stream of that user.

For Youtube I used their [own module](https://developers.google.com/youtube/v3/quickstart/nodejs) for Node.js, whereas for Twitch I used a third party module available [here](https://github.com/thedist/)Twitch_API_v5/

For the Youtube part, one of the requests was to return the name of the game, for gaming videos. However Google doesn't have this available on their API. To circuvent this, I used a best guess function, where I analise the tags, and choose the string that shows up more often.
For example, with a tag list of {F1 2020, F1 2020 game, F1 2020 video, Formula 1, F1 video}, the name chosen will be F1 2020, as it shows (partially) in 3 different tags.

Also had some trouble on how to wait for the reply from Youtube / Twitch api, as JS is asynchronous by nature. The solution I used for this was to use promises, as this allows me to wait for the completion using await / async.

For sending the data back, instead of using the native http, I used [Express](http://expressjs.com/), as it has better support for json responses (I was having some encoding issues using http and Youtube description field).

To test this, make sure to edit the index.js file and update the respective API keys (or Client ID on Twitch) so that the calls to the respective APIs work.