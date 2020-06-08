const request = require('request')


// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bd2a2c7585b92b37701d1bde2d1b46ee&query=' + latitude + ','+ longitude + '&units=m'
    request({url, json: true}, (error, {body}) =>{
   
    if(error) {
       callback('Unable to connect to weather services', undefined)
    } else if(body.error){
        callback('Unable to handle latitude or longitude', undefined)
    } else{
        callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature
              + ' degrees out and the humidity is ' + body.current.humidity)
    }
}
    )}

module.exports = forecast


