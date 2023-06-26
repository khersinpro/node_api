'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.User, {
          foreignKey: 'role_name'
        })
    }
  }

  Roles.init({
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });

  return Roles;
};