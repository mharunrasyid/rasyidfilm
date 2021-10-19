'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Videos",
        "UrlVideo",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      ),
      queryInterface.changeColumn(
        "Videos",
        "thumbnail",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Videos");
  }
};
