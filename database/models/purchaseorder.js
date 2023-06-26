'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchaseorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.Order, {
        foreignKey: 'purchaseorder_id'
      })
    }
  }
  purchaseorder.init({
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Purchaseorder',
  });
  return purchaseorder;
};