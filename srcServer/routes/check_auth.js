const checkAuthorized = require('../controllers/checkAuth')
const auth = require('../middlewares/auth');

module.exports = (router) => {
  // router.use(auth.checkAuth);
  router.route('/')
    .post(auth.checkAuth,checkAuthorized.getCheckAuth)
  // .post(uploadFiles.uploadFiles)
}