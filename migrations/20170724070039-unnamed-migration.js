'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Spots',
      'rate',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
  return  queryInterface.removeColumn(
      'Spots',
      'rate'
    )
  }
};
