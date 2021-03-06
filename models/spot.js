'use strict';
module.exports = function(sequelize, DataTypes) {
  var Spot = sequelize.define('Spot', {
    name: DataTypes.STRING,
    lng: DataTypes.STRING,
    lat: DataTypes.STRING,
    description: DataTypes.STRING,
    premium: DataTypes.BOOLEAN,
    count: DataTypes.INTEGER,
    category: DataTypes.STRING,
    rate: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Spot.hasMany(models.Image, {
          foreignKey: 'owner_id'
        });
      }
    }
  });
  return Spot;
};
