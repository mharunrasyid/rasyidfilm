"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Videos",
        "views",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Videos",
        "views",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      )
    ]);
  },
};
