const request = require('postman-request');


const geoCode = (address,callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1YmhhbTc3NyIsImEiOiJja2gxcGdteG0xYTc3Mnludmt1dzUxZHhzIn0.sTZEuhcyl3f4Zkr_SJAH2A&limit=1`
    request({url, json:true},(error,{body} = {}) => {
        if(error) {
            callBack('Unable to connect to location services!',undefined)
        } else if (body.features.length === 0) {
            callBack('Unable to find location try aother search',undefined)
        } else {
            callBack(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    }) 
}

module.exports = geoCode