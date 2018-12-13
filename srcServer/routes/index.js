const changeCase = require('change-case');
const express = require('express');
const routes = require('require-dir')();
const auth = require('../middlewares/auth');

module.exports = (app) => {
  Object.keys(routes).forEach((routeName) => {
    const router = express.Router();
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`./${routeName}`)(router);

    app.use(`/${changeCase.paramCase(routeName)}`, router);
  });
};

