const request = require('request')

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/ba8d0b36162f66f2a1f112569c802d85/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature             
            });
        } else {
            callback('Unable to fetch weather.');
        }
    })
};

var getPressure = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/ba8d0b36162f66f2a1f112569c802d85/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200){
            callback(undefined, {
                pressure: body.currently.pressure
            });
        } else {
            callback('Unable to connect to DarkskyAPI');
        }
    })
}

var fahrenheitToCelsius = (temperature) => {
    return 5*((temperature - 32)/9);
};

module.exports = {
    getWeather,
    getPressure,
    fahrenheitToCelsius
};
