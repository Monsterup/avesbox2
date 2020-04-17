let User = require('../../database/models/user');
let jwt = require('jsonwebtoken');

exports.postLogin = function (req, res) {
    const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com'
    };
    const secretKey = process.env.APP_KEY;
    jwt.sign({user}, secretKey, {expiresIn: '30s'}, (err, token) => {
        res.json({
            token,
        })
    })
}

exports.verifyToken = (verifyToken_ , function (req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err)
            res.send(403)
        else {
            res.json({
                message: 'JWT Passed',
                authData
            })
        }
    })

    res.json({
        message: 'welcome to API JSONWEBTOKEN'
    })
})

function verifyToken_(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
}