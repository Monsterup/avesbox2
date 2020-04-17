let router = require('express').Router();
let controller = require('./UserController');

// RESET PASSWORD
router.get('/password-reset/:token', controller.checkTokenReset);
router.put('/password-reset/:token', controller.resetPassword);

// VERIFY EMAIL
router.get('/verify-email/:token', controller.verifyEmail);

module.exports = router;