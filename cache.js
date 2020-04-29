let apiCache = {youtube:{}, twitch: {}};

function getCache(bucket, id)
{
    console.log('Fetching cache for ' + bucket + ' with id ' + id + (apiCache[bucket][id] != null ? '... it exists' : '... not found'));
    return apiCache[bucket][id];
}

function setCache(bucket, id, data)
{
    console.log('Saving data on cache for ' + bucket + ' with id ' + id);
    apiCache[bucket][id] = data;
}

module.exports.getCache = getCache;
module.exports.setCache = setCache;