var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAcGfrMjYXckO-8vjuFt1h7H2N5pIYI2lA'
});
const axios = require('axios');

module.exports = {
  placeByDisctrict:function(place,district){
    return new Promise(function(res,rej){
      googleMapsClient.places({
        query:`${place} di ${district} di Belitung`
      },
        function(err,response){
          if (err) {
            rej(err)
          } else {
            if (response.json.results.length!=0) {
               const out = response.json.results.slice(0,10)
               res(out)
            } else {
              rej(response.json.results[0])
            }
          }
        })
    })
  },
  weather:function(place){
    if (!place) {
      place = 'belitung'
    }
    return new Promise(function(res,rej){
      axios.get(`http://api.apixu.com/v1/forecast.json?key=93f2d0033477496e872184709172607&q=${place}`)
      .then(data=>{
        const newsdata = data.data.forecast.forecastday[0].hour.filter((hour,index)=>(index+1)%6==0);
        res(newsdata)
      }).catch(err=>{
        rej(err);
      })
    })
  }
}
