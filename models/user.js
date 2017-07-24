'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    facebook_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};