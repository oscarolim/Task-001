var {google} = require('googleapis');

function getYoutubeData(videoId, ApiKey, cache, globalResponse)
{ 
    let cachedData = cache.getCache('youtube', videoId);
    if(cachedData != null)
    {
        globalResponse.json(cachedData);
        return;
    }

    let result = {status: 'success'};
    const params = {
        id: videoId,
        part: 'snippet'
    };

    const youtube = google.youtube({
        version: 'v3',
        auth: ApiKey
    });

    youtube.videos.list(params, (err, res) => {
        if (err){
            result = {status: 'error', error: err};
        }

        if(res == undefined)
            result = {status: 'error', error: 'Invalid API Key'};
        else
        {
            if(res.data.items.length > 0)
            {
                let details = res.data.items[0];
                result = {
                    status: 'success',
                    title: details.snippet.title,
                    description: details.snippet.description,
                    channelName: details.snippet.channelTitle,
                    channelId: details.snippet.channelId,
                    gameName: details.snippet.categoryId == 20 ? getBestGuessGameName(details.snippet.tags) : ''
                }
                cache.setCache('youtube', videoId, result);
            }
            else
            result = {status: 'error', error: 'Video not found'};
        }
        globalResponse.json(result);
    });
}

function getBestGuessGameName(tags)
{
    if(tags.length == 0)
        return '';

    let bestGuessTag = '';
    let bestGuessTagCount = 0;
    for(var i = 0; i < tags.length; i++)
    {
        let tag = tags[i];
        let tagCount = 0;
        //Check how many times this tag shows partially on all other tags and save it.
        for(var j = 0; j < tags.length; j++)
            tagCount += (tags[j].includes(tag) ? 1 : 0);
        if(tagCount > bestGuessTagCount)
        {
            bestGuessTagCount = tagCount;
            bestGuessTag = tag;
        }
    }
    return bestGuessTag;
}

module.exports = getYoutubeData;