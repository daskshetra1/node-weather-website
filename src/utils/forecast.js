const request = require('request')

const forecast = (latitude , longitued, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4a90da2c1aff5c050b833b2e67f4dde7&query='+ latitude +','+ longitued +'&units=f'

    request({ url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find Location! Please try another Search!', undefined);
        } else {
            // callback(undefined, {
            //     placename : response.body.current.weather_descriptions[0],
            //     Temperature : response.body.current.temperature,
            //     Rainchance : response.body.current.precip
            // })
            callback(undefined, body.current.weather_descriptions[0] +' It is Currently '+ body.current.temperature + ' degrees Out.' + ' There is ' + body.current.precip + '% chance of rain.');
        }
    })
}


module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=4a90da2c1aff5c050b833b2e67f4dde7&query=37.8267,-122.423&units=f';

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find Location');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] +'It is Currently '+ response.body.current.temperature + ' degrees Out.' + ' There is ' + response.body.current.precip + '% chance of rain');
//     }
// });