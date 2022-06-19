"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Users",
        "email",
        {
          type: Sequelize.STRING(150),
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Users",
        "firstname",
        {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Users",
        "lastname",
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Users",
        "email",
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Users",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Users",
        "lastname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
    ]);
  },
};

