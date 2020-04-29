var twitch = require('twitch-api-v5');

function getStreamerData(streamerName, ApiKey, cache, globalResponse)
{ 
    let cachedData = cache.getCache('twitch', streamerName);
    if(cachedData != null)
    {
        globalResponse.json(cachedData);
        return;
    }

    let result = {status: 'error'};
    twitch.clientID = ApiKey;
    twitch.users.usersByName({users: streamerName}, (err, res) => {
        if(err) {
            globalResponse.json({status: 'error', error: err});
        } else {
            if(res._total > 0)
                getStreamStatus(res.users[0]._id, ApiKey, cache, globalResponse);
            else
            globalResponse.json({status: 'error', error: res.message != undefined ? res.message : 'Invalid streamer name'});
        }
    });
}

function getStreamStatus(streamerId, ApiKey, cache, globalResponse)
{
    let cachedData = cache.getCache('twitch', streamerId);
    if(cachedData != null)
    {
        globalResponse.json(cachedData);
        return;
    }

    twitch.clientID = ApiKey;
    twitch.streams.live({channel: streamerId}, (err, res) => {
        if(err) {
            globalResponse.json({status: 'error', error: err});
        } else {
            let result = {status: 'success', streaming: false}
            if(res.streams.length > 0)
            {
                let details = res.streams[0];
                result = {
                    status: 'success',
                    name: details.channel.display_name,
                    displayName: details.channel.name,
                    streaming: true,
                    gameTitle: details.game
                }
                cache.setCache('twitch', details.channel.name, result);
                cache.setCache('twitch', streamerId, result);
                globalResponse.json(result);
            }
            else
            {
                //Get the name of the user
                twitch.users.userByID({userID: streamerId}, (err, res) => {
                    if(err) {
                        globalResponse.json({status: 'error', error: err});
                    } else {
                        let result = {status: 'success', streaming: false}
                        if(res.error == undefined)
                        {
                            result = {
                                status: 'success',
                                displayName: res.display_name,
                                name: res.name,
                                streaming: false,
                                gameTitle: ''
                            }
                            cache.setCache('twitch', res.name, result);
                            cache.setCache('twitch', streamerId, result);
                        }
                        else
                            result = {status: 'error', error: res.message}
                        globalResponse.json(result);
                    }
                });
            }
        }
    });
}

module.exports.stream = getStreamerData;
module.exports.streamById = getStreamStatus;