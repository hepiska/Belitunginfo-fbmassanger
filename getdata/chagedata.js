const fs = require('fs');

const hotelGoogle = JSON.parse(fs.readFileSync('./googleHotel.json').toString())
const restoGoogle = JSON.parse(fs.readFileSync('./googleresto.json').toString())
// const restoGoogle = fs.readFileSync('./googleresto.json').toString().split('\n')

const dataHotel = hotelGoogle.map((hotel,index)=>{
  const newhotel = {};
  newhotel.id = index
  newhotel.name = hotel.name
  newhotel.lng = hotel.geometry.location.lng
  newhotel.lat = hotel.geometry.location.lat
  newhotel.description = ''
  newhotel.premium = false
  newhotel.count = 0
  newhotel.category = 'hotel'
  newhotel.rate = hotel.rating
  if (hotel.photos) {
    newhotel.photo_reference = hotel.photos[0].photo_reference
  } else {
    newhotel.photo_reference = ''
  }
     return newhotel
})

const dataResto = restoGoogle.map((resto,index)=>{
  const newResto = {};
  newResto.id = dataHotel.length + index
  newResto.name = resto.name
  newResto.lng = resto.geometry.location.lng
  newResto.lat = resto.geometry.location.lat
  newResto.description = ''
  newResto.premium = false
  newResto.count = 0
  newResto.category = 'restorant'
  newResto.rate = resto.rating
  if (resto.photos) {
    newResto.photo_reference = resto.photos[0].photo_reference
  } else {
    newResto.photo_reference = ''
  }
     return newResto
})

fs.writeFile('message.Json',JSON.stringify(dataHotel.concat(dataResto)), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

console.log(dataResto.length);
