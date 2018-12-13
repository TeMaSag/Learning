const filterCars = require('../controllers/filterCars')
const auth = require('../middlewares/auth');
module.exports = (router) => {
  // router.use(auth.checkAuth)  
  // router.use(auth.authRequired)
  router.route('/')
    .get(filterCars.getCarData)
};