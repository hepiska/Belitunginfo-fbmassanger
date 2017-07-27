const model = require('../models')

module.exports = {
  recomPlaces:(category)=>{
    return new Promise((res,rej)=>{
        model.sequelize.query(`Select Spots.id as id,Spots.name as name, Spots.lng as lng,Spots.lat as lat ,Spots.description as description,Spots.category as category,Spots.rate as rate, Images.image_url as image_url
        from public."Spots" Spots left join public."Images" Images ON(Spots.id = Images.owner_id) where Spots.category='${category}' and rate>='4' order by rate desc limit 8 `
           ,{
             type: model.sequelize.QueryTypes.SELECT
           }).then(function(stores){
             res(stores)
           }).catch(function(err){
             rej(err)
           })
      })
  }
}
