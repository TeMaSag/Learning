const changePassword = require('../controllers/changePassword')
const changeRole = require('../controllers/roleUser')
const allUsers = require('../controllers/allUsers')
const auth = require('../middlewares/auth');
module.exports = (router) => {
  // router.use(auth.checkAuth)  
  router.route('/all-users')
    .get(allUsers.getAllUsers)
  router.route('/role')
    .post(changeRole.postRole)
  router.route('/:user')
    .post(changePassword.putChangePassword)
};