
const registr = require('../controllers/registrForm')
const auth = require('../middlewares/auth');

/* GET home page. */
module.exports = (router) => {
    // router.use(auth.checkAuth); 
    router.route('/')
        .get(registr.getRegistr)
        .post(registr.postRegistr)
};
