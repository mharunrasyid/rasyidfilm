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
        }
      }),
      queryInterface.addColumn(
        "Videos",
        "likes",
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: [],
        }
      ),
      queryInterface.addColumn(
        "Videos",
        "dislikes",
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: [],
        }
      ),
      queryInterface.changeColumn(
        "Videos",
        "title",
        {
          type: Sequelize.STRING(150),
          allowNull: false,
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Videos", "UserId", {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.removeColumn(
        "Videos",
        "likes"
      ),
      queryInterface.removeColumn(
        "Videos",
        "dislikes"
      ),
      queryInterface.changeColumn(
        "Videos",
        "title",
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      )
    ]);
  },
};
