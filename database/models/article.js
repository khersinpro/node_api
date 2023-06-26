'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Ingredient, {
        through: 'article_ingredient',
        foreignKey: 'article_id'
      })
      this.hasMany(models.Order, {
        foreignKey: 'article_id'
      })
    }
  }

  Article.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Article',
  });
  
  return Article;
};