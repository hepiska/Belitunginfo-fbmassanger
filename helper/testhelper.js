var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAcGfrMjYXckO-8vjuFt1h7H2N5pIYI2lA'
});

const placeByDisctrict = (place,district) => {
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
}

placeByDisctrict( 'restaurant','tanjung tingggi' ).then(data=>{
  console.log(data);
})
