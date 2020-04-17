let router = require('express').Router();
let controller = require('./AuthController')

router.route('/login').post(controller.postLogin);
router.route('/')
router.route('/verifyToken').get(controller.verifyToken);
module.exports = router;