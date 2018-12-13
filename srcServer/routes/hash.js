
// var express = require('express');
const { getHash } = require('../controllers/hash')
const auth = require('../middlewares/auth');
module.exports = (router) => {
  // router.use(auth.checkAuth)  
  router.route('/:hash')
    .get(getHash)
};