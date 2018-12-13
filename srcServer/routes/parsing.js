const parsing = require('../controllers/parsing')
const auth = require('../middlewares/auth');
module.exports = (router) => {
  router.use(auth.checkAuth);   
    router.route('/')
      .get(parsing.getParsing)
      .post(parsing.postParsing)
};
