"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Videos",
        "dislikes",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn(
        "Videos",
        "title",
        {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Videos",
        "desc",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Videos");
  },
};

