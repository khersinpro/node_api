'use strict';
const { Model } = require('sequelize');
const bcrypt    = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate(models) {
      this.belongsTo(models.Roles, {
        foreignKey: {
          name: 'role_name',
          defaultValue: 'ROLE_USER'
        }  
      })
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    };
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    } ,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        let salt = bcrypt.genSaltSync(12);
        let hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash )
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};