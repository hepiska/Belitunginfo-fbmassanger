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
 showSpots:(req,res)=>{
   model.Spot.findAll({
   }).then(data=>{
     res.send(data)
   })
 },
 deleteSpot:(req,res)=>{
   model.Spot.destroy({
     where:{
       id:req.params.id
     }
   }).then(data=>{
     res.send("delete success")
   })
 },
 addImage:(req,res)=>{
   const {owner_id,image_url} = req.body

   model.Image.create({
     owner_id,
     image_url
   }).then((data)=>{
     res.send('insert data succes')
   }).catch(err=>{
     res.send(err)
   })
 },
 showImage:(req,res)=>{
   const {owner_id,image_url} = req.body
   model.Image.findAll({
   }).then((data)=>{
     res.send(data)
   }).catch(err=>{
     res.send(err)
   })
 },
 deleteImage:(req,res)=>{
   model.Image.destroy({
     where:{
       id:req.params.id
     }
   }).then(data=>{
     res.send("delete success")
   })
 },

}
