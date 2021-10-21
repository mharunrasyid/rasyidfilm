"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface
        .changeColumn("Videos", "likes", {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: [],
        }),
      queryInterface
        .changeColumn("Videos", "dislikes", {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: [],
        }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Videos");
  },
};
