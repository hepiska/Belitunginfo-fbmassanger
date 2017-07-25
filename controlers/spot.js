const model = require('../models');
module.exports = {
 addSpot:(req,res)=>{
   const {name,lng,lat,description,premium,count,category,rate} = req.body
   model.Spot.create({name, lng, lat, description, premium, count, category, rate
   }).then((data)=>{
     res.send('insert data succes')
   }).catch(err=>{
     res.send(err)
   })
 },
 showSpot:(req,res)=>{
   model.Spot.findAll({
     where:{
       id:req.params.id
     }
   }).then(data=>{
     res.send(data)
   })
 },
 addImage:(req,res)=>{
   const {spot_id,image_url} = req.body
   model.Image.create({
     spot_id,
     image_url
   }).then((data)=>{
     res.send('insert data succes')
   }).catch(err=>{
     res.send(err)
   })
 }

}
