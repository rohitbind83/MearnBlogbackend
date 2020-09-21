const express = require('express');
const blogcontroller =  require('../controller/api/blog');
const bodyParser   = require('body-parser');
const headerMiddleware  = require('../middlewares/apiKey') // middlware check header
const router = express.Router();

router.use(bodyParser.json()); // for json data
router.use(bodyParser.urlencoded({extended:true})); // for json data
/* GET home page. */
router.route('/').get(blogcontroller.Test);


// router.route('/').get(blogcontroller.Test);
router.route('/home').get(headerMiddleware.ensureToken,blogcontroller.Home);
router.route('/allposts').get(headerMiddleware.ensureToken,blogcontroller.allpost);
router.route('/savepost').post(headerMiddleware.ensureToken,blogcontroller.allpostSave);


// router.use(headerMiddleware.apiKey) // need apikey
router.route('/login').post(headerMiddleware.apiKey,blogcontroller.login);
router.route('/register').post(headerMiddleware.apiKey,blogcontroller.singUp);

module.exports = router;
