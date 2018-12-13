
const auth = require('../auth/index')
const checkAuth = require('../middlewares/auth');
/* GET home page. */
module.exports = (router) => {
    // router.use(checkAuth.checkAuth); 

    router.route('/')
        .get(auth.getAuth)
        .post(auth.postAuth)
    router.route('/auth-token')
        .post(auth.FBAuth)
};
