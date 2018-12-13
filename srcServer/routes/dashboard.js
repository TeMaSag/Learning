// var express = require('express');
const dashboard= require('../controllers/dashboard')
const uploadFiles = require('../controllers/uploadFiles')
const auth = require('../middlewares/auth');

module.exports = (router) => {
  // router.use(auth.checkAuth);    
  router.route('/')
    .get(dashboard.getDashboard)
    // .post(uploadFiles.uploadFiles)
};