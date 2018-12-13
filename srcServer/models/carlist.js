'use strict';
module.exports = (sequelize, DataTypes) => {
  var carlist = sequelize.define('carlist', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  carlist.associate = function(models) {
    // associations can be defined here
  };
  return carlist;
};