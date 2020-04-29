var twitch = require('twitch-api-v5');

function getStreamerData(streamerName, ApiKey)
{ 
  return new Promise((resolve, reject) => {
    twitch.clientID = ApiKey;
    twitch.users.usersByName({users: streamerName}, (err, res) => {
        if(err) {
            reject(err);
        } else {
            if(res._total > 0)
                resolve(res.users[0]._id);
            else
                reject(res.message != undefined ? res.message : 'Invalid streamer name');
        }
    });
  });
}

function getStreamStatus(streamerId, ApiKey)
{
  return new Promise((resolve, reject) => {
    if(streamerId == null)
        reject('Invalid streamer id');
    else
    {
        twitch.clientID = ApiKey;
        twitch.streams.live({channel: streamerId}, (err, res) => {
            if(err) {
                reject(error);
            } else {
                let result = {status: 'success', streaming: false}
                if(res.streams.length > 0)
                {
                    let details = res.streams[0];
                    result = {
                        status: 'success',
                        name: details.channel.display_name,
                        streaming: true,
                        gameTitle: details.game
                    }
                }
                resolve(result);
            }
        });
    }
  });
}

// using async call as we want the call to Twitch Api to complete before sending the response
async function getStreamer(streamerName, ApiKey)
{
	try {
        //First we get the streamer id from the name...
        let streamerId = await getStreamerData(streamerName, ApiKey);
        //To then do a further request for the stream information
        return await getStreamStatus(streamerId, ApiKey);
	}
	catch(error) {
		return {status: 'error', error: error}
	}
}

module.exports = getStreamer;