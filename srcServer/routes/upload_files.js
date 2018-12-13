const uploadFiles = require('../controllers/uploadFiles')
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
const { getHash } = require('../controllers/hashUpload')
const auth = require('../middlewares/auth');

module.exports = (router) => {
  router.use(auth.checkAuth)  
  router.route('/') 
    .get(uploadFiles.getUpload)
    .post(upload.single('avatar'), uploadFiles.uploadFiles) 
  router.route('/:hash') 
    .get(getHash) 
};
