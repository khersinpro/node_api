'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Récupération des models
const modelList = [
  require('./models/user'),
  require('./models/roles'),
  require('./models/article'),
  require('./models/ingredient')
];


// Déclaration des models a sequelize
modelList.forEach(model  => model(sequelize, Sequelize.DataTypes));


Object.values(sequelize.models)
.filter(model => typeof model.associate === "function")
.forEach(model => model.associate(sequelize.models));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
