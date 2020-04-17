const User = require('../models/user');

module.exports = async (req,res,next) => {
    if(!req.isAuth) {
        req.isAllowed = false;
        return next()
    }
    const user = await User.findById(req.userId);
    if(user.type !== "owner") {
        req.isAllowed = false;
        return next();
    }
    req.isAllowed = true;
    next();
}