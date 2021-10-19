'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "Comments",
        "desc",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  }
};
