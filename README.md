# Task-001
Task for a job position

Using Node.js, I had to create an API with two endpoints. One would receive a Youtube video ID and would return information about it. The other would receive a Twitch ID and return information about the stream of that user.

For Youtube I used their [own module](https://developers.google.com/youtube/v3/quickstart/nodejs) for Node.js, whereas for Twitch I used a third party module available [here](https://github.com/thedist/Twitch_API_v5/).

For the Youtube part, one of the requests was to return the name of the game, for gaming videos. However Google doesn't have this available on their API. To circuvent this, I used a best guess function, where I analise the tags, and choose the string that shows up more often.
For example, with a tag list of {F1 2020, F1 2020 game, F1 2020 video, Formula 1, F1 video}, the name chosen will be F1 2020, as it shows (partially) in 3 different tags.

I used two methods to fetch the information. The async way, and using promises.

For sending the data back, instead of using the native http, I used [Express](http://expressjs.com/), as it has better support for json responses (I was having some encoding issues using http and Youtube description field).