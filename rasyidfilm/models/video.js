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
      Video.hasMany(models.Comment, { onDelete: 'cascade' });
    }
  }
  Video.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING(150),
    UrlVideo: DataTypes.TEXT,
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    private: DataTypes.BOOLEAN,
    desc: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    dislikes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};