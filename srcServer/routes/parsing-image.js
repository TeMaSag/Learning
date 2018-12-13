const parsing = require('../controllers/parsingImg')
const auth = require('../middlewares/auth');
module.exports = (router) => {
  router.use(auth.checkAuth);   
  router.route('/')
    .post(parsing.postParsing)
};
