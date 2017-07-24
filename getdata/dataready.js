const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./message.json').toString())

const spot = data.map((hotel,index)=>{
  const newhotel = {};
  newhotel.name = hotel.name
  newhotel.lng = hotel.lng
  newhotel.lat = hotel.lat
  newhotel.description = ''
  newhotel.premium = false
  newhotel.count = 0
  newhotel.category = hotel.category
  newhotel.rate = hotel.rate
  return newhotel
})

console.log(spot);

fs.writeFile('hotelResto.Json',JSON.stringify(spot), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
