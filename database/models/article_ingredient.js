'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class ArticleIngredient extends Model {
    static associate(models) { }
  }

  ArticleIngredient.init({
      article_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Article',
            key: 'id'
        }
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ingredient',
            key: 'id'
        }
    }
  }, {
    sequelize,
    modelName: 'article_ingredient',
  });

  return ArticleIngredient;
};