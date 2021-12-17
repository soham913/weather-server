const request = require('request')

const getData = function(data, callback) {
        const [lon,lat] = data
        const url = `http://api.weatherstack.com/current?access_key=46308d5ab9561b94c5cc90d346bf0e24&query=${lat},${lon}`
        request({url, json: true}, (err, data) => {
            if(err)
                console.log(err)
            else if(!data.body.current)
                console.log('Data not found!')
            else
                callback(undefined, `Today's temp is ${data.body.current.temperature} degrees. There is ${data.body.current.cloudcover}% chance of rain. `)
        })
}

module.exports = { getData }