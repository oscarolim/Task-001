var {google} = require('googleapis');

function getYoutubeData(videoId, ApiKey)
{ 
  return new Promise((resolve, reject) => {
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
        console.log(err);
        reject(err);
      }

      if(res.data.items.length > 0)
      {
        let details = res.data.items[0];
        if(details.snippet.categoryId == 20)
        //Game categoryId is 20
        result = {
          status: 'success',
          title: details.snippet.title,
          description: details.snippet.description,
          channelName: details.snippet.channelTitle,
          gameName: details.snippet.categoryId == 20 ? getBestGuessGameName(details.snippet.tags) : ''
        }
      }
      resolve(result);
    });
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

// using async call as we want the call to YT Api to complete before sending the response
async function getVideo(videoId, ApiKey)
{
	try {
		return await getYoutubeData(videoId, ApiKey);
	}
	catch(error) {
    console.log(error);
    return {status: 'error', error: error}
	}
}

module.exports = getVideo;