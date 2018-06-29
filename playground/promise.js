const geocode = require('../geocode/geocode.js')

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b)
            } else {
                reject('Arguments must be numbers')
            }
        }, 1500);
    });
};

var somePromise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve('It worked');
        //reject('Unable to fulfill promise')
    }, 2500);
});

/* somePromise.then((message) => {
    console.log(`Success: ${message}`)
}, (errorMessage) => {
    console.log('Error: ', errorMessage)
}); */

asyncAdd(2, 2).then((res) => {
    console.log(`${res}`);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log(`Should be 37 ${res}`);
}).catch((errorMessage) => {
    console.log(errorMessage);
});