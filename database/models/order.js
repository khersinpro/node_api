'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Article, {
        foreignKey: 'article_id'
      })
      this.belongsTo(models.Purchaseorder, {
        foreignKey: 'purchaseorder_id'
      })
    }
  }
  order.init({
    nb_articles: {
      type: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Order',
  });
  return order;
};