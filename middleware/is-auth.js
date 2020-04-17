const jwt = require('jsonwebtoken');
// const redis = require('../helpers/redis');

module.exports = async (req,res,next) => {
    const authHeader = req.get('authorization');
    if (!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.APP_KEY);
    }catch (e) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}