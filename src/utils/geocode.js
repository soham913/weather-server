const request = require('request')

const getLocation = (location, callback) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic29oYW1zYWdhZGUiLCJhIjoiY2t3bjZ1dW9sMHRpbzJubG5uemtvcmF0diJ9.oW91b_9GoxkpissZyho3JA&limit=1`
        request({url, json: true}, function(err, data) {
            if(err)
                callback('Something went wrong!')
            else if(!data.body.features.length)
                callback('Enter correct place!');
            else {
                callback(undefined, data.body.features[0].center);
            }
        })
}

module.exports = { getLocation }