const request = require('request');

const securityKey = "39936cfbe0f8b14346877e0f4c52a372";
const sendRequest = (location,callback) => {
    const endPoint = "http://api.weatherstack.com/current?access_key="+securityKey+"&query="+location;
request({url:endPoint,json:true},(error,{body})=>{
    if(error)
    {
        callback("Unable to connect to API, please check your network connectivity");
    }
    else if(body.error)
    {
        callback("Unable to find location, please reecheck the location you entered");
    }
    else
    {
        const temperature = body.current.temperature
        const place = body.location.name 
        const weatherDescriptions = body.current.weather_descriptions[0]
        const weatherImage = body.current.weather_icons[0];
        callback(undefined,{temperature,place,weatherDescriptions,weatherImage});
    }
});
}

module.exports = sendRequest;