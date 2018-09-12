"use strict";

const bcrypt = require('../../src/lib/helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    
    queryInterface.bulkInsert("Roles", [{
      id:1,
      name: "ADMIN"
    },
    {
      id:2,
      name: "STANDARD"
    }], {});
    
    return queryInterface.bulkInsert("Users", [{
        username: "admin",
        name: "admin",
        password: await bcrypt.encrypt('pass'),
        role: 1
      },
      {
        username: "standard",
        name: "standard",
        password: await bcrypt.encrypt('pass'),
        role: 2
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Roles", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};