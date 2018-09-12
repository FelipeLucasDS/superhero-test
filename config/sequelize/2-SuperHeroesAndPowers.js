"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("ProtectionAreas", [{
        id:1,
        name: "Z city",
        lat: "123",
        long: "123",
        radius: 123
      },
      {
        id:2,
        name: "Namek",
        lat: "123",
        long: "123",
        radius: 123
    }], {});

    queryInterface.bulkInsert("SuperHeroes", [{
        id: 1,
        name: "Saitama",
        alias: "Saitama",
        protectionAreaId:1
      },
      {
        id: 2,
        name: "Goku",
        alias: "Goku",
        protectionAreaId:2
    }], {});
    
    queryInterface.bulkInsert("SuperPowers", [{
        id: 1,
        name: "Soco serio",
        description: "Soco focalizado"
      },
      {
        id: 2,
        name: "Onda vital",
        description: "Kamehameha"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("ProtectionArea", null, {});
    queryInterface.bulkDelete("SuperHeroes", null, {});
    return queryInterface.bulkDelete("SuperPowers", null, {});
  }
};