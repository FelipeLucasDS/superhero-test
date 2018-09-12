"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SuperHeroesPowers", [{
        superHeroId: 1,
        superPowerId: 1
      },
      {
        superHeroId: 2,
        superPowerId: 2
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SuperHeroesPowers", null, {});
  }
};