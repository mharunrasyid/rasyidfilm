'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Video, { onDelete: 'cascade' });
      User.hasMany(models.Comment, { onDelete: 'cascade' });
    }
  }
  User.init({
    firstname: DataTypes.STRING(100),
    lastname: DataTypes.STRING(100),
    email: DataTypes.STRING(150),
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};