const request = require('postman-request')

const foreCast = (latitude,longitude, callBack) => {
    const url = `http://api.weatherstack.com/current?access_key=208c3ea454a50ce2b463ca24fd3ae279&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`
    request({ url, json: true },(error,{body} = {}) =>{
        if(error) {
            callBack('Uanble to connect forecast app!',undefined)
        } else if(body.error) {
            callBack('Unable to find Coordiante',undefined)
        } else {
            callBack(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} and it feels like ${body.current.feelslike}`)
        }
    })
}

module.exports = foreCast