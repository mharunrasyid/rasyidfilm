"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Comments", "VideoId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Videos",
          key: "id",
          as: "VideoId",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  },
};
