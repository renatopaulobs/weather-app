const request = require('request')
var indigo = {
    address: '',
    latitude: '',
    longitude: ''
};

var geocodeAddress = (address) => {
    return new Promise ((resolve, reject) => {     
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true
        }, (error, response, body) => {
            if (error){
                reject('Unable to connect to Google servers')
            }else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to find that Address.')
            }
            else if(body.status === 'OVER_QUERY_LIMIT'){
                reject('You have exceeded your daily request quota for this API')
            }else if(body.status === 'OK'){
                resolve({
                  address: body.results[0].formatted_address,
                  latitude: body.results[0].geometry.location.lat,
                  longitude: body.results[0].geometry.location.lng
                });          
            }else{
                console.log(`Something went wrong`);    
            }
        })
    });
};

geocodeAddress('50670-160').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
    indigo = location;

    console.log(JSON.stringify(indigo, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})