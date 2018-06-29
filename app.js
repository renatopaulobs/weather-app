const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');
const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage)
            } else {
                console.log(`It's currently ${weather.fahrenheitToCelsius(weatherResults.temperature).toFixed(2)} Celsius.`);
                console.log(`Apparent temperature ${weather.fahrenheitToCelsius(weatherResults.apparentTemperature).toFixed(2)} Celsius.`);               
            }
        });        
    }
}); 

//While non-blocking language, methods without callback are loaded before callback ones.
//Maybe Promise functions are better than callbacks.
