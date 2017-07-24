'use strict';
const fs = require('fs')
const readFile = fs.readFileSync('getdata/hotelResto.json').toString();
const dataPlaceJson = JSON.parse(readFile);

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', dataPlaceJson);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
