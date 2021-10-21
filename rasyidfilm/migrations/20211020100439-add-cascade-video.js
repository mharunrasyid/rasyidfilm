"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Videos", "UserId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "UserId",
        },
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Videos");
  },
};
