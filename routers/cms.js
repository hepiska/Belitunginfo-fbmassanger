const router = require('express').Router();
const model = require('../models');

router.post('/addSpot', function(req, res) {
  const {name,lng,lat,description,premium,count,category,rate} = req.body
  model.Spot.create({
    name,
    lng,
    lat,
    description,
    premium,
    count,
    category,
    rate
  }).then((data)=>{
    res.send('insert data succes')
  }).catch(err=>{
    res.send(err)
  })

});

router.post('/addImage', function(req, res) {
  const {spot_id,image_url} = req.body
  model.Image.create({
    spot_id,
    image_url
  }).then((data)=>{
    res.send('insert data succes')
  }).catch(err=>{
    res.send(err)
  })

});

module.exports = router
