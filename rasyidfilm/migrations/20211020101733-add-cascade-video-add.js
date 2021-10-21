"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Videos", "dislikes", {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      }),
      queryInterface.addColumn("Videos", "likes", {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Videos");
  },
};
