const homePage = require('../controllers/HomePage')
const auth = require('../middlewares/auth');
const savedb = require('../controllers/savedb')
const showUrl = require('../controllers/showUrl')
const exitAccount = require('../controllers/exitAccount')

/* GET home page. */
module.exports = (router) => {
    // router.use(auth.checkAuth);  
    // router.use(auth.authRequired);     
    router.route('/')
        .get(homePage.getHomePage)
        .post(auth.checkAuth,homePage.postHomePage);
        
    router.route('/savedb')
        .post(auth.checkAuth,savedb.postSaveDb);

    router.route('/show-url')
        .post(auth.checkAuth,showUrl.postShowUrl);
};
