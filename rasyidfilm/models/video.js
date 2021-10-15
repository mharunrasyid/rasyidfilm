'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.belongsTo(models.User);
      Video.hasMany(models.Comment);
    }
  };
  Video.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    UrlVideo: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    desc: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};