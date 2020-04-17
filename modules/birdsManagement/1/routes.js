let router = require('express').Router();
let cache = require('express-redis-cache')();

let  controller =
require('./birdsManagementController')

router.route('/birds')
    .get(controller.index)
    .post(controller.store);

router.route('/birdsCached',cache.route()).get(controller.indexCached);
module.exports = router;