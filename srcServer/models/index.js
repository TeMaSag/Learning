const Sequelize = require('sequelize');
const models = require('require-dir')();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database')[env];

const db = {};

let sequelize;

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );


Object.keys(models).forEach((path) => {
  const model = sequelize.import(path);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
