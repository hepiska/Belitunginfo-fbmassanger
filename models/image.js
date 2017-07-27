'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    owner_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsTo(models.Spot,{
          foreignKey: 'owner_id'
        })
      }
    }
  });
  return Image;
};
