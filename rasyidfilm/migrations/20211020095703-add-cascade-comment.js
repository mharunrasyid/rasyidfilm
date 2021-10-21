"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Comments", "UserId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "UserId",
        },
      }),
      queryInterface.changeColumn("Comments", "VideoId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  },
};
