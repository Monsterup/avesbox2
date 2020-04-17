const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const responseMsg = require('../../helpers/responseMessage');

exports.verifyEmail = async (req, res) => {
    try {
        let { token } = req.params;
        let now = new Date();
        let user = await User.findOne({verifyToken: token});
        if (!user) {
            console.log('Verify Email link is invalid');
            res.send('Verify Email link is invalid');
        }
        if (now > user.verifyTokenExpiry) {
            console.log('Verify Email link has expired')
            res.send('Verify Email link has expired');
        }
        await user.updateOne({
            verified: true,
            verifyTokenExpiry: now
        });
        res.status(200).send('Email verified');
        // res.end();
    } catch (error) {
        res.send(error);
    }
}

// RESET PASSWORD
exports.checkTokenReset = async (req, res) => {
    try {
        let { token } = req.params;
        let now = new Date();
        let user = await User.findOne({resetPasswordToken: token});
        if (!user) {
            console.log('Password reset link is invalid');
            res.send('Password reset link is invalid');
        }
        if (now > user.resetPasswordTokenExpiry) {
            console.log('Password reset link has expired')
            res.send('Password reset link has expired');
        }
        res.status(200).send({
            user: user.username,
            message: 'Password reset link ok'
        });
    } catch (error) {
        throw error;
    }
}
exports.resetPassword = async (req, res) => {
    try {
        let { token } = req.params;
        let now = new Date();
        let user = await User.findOne({resetPasswordToken: token});
        if (!user) {
            console.log('Password reset link is invalid');
            res.send('Password reset link is invalid');
        }
        if (now > user.resetPasswordTokenExpiry) {
            console.log('Password reset link has expired')
            res.send('Password reset link has expired');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await user.updateOne({
            password: hashedPassword,
            resetPasswordTokenExpiry: now
        });
        res.status(200).send({
            message: 'Password Updated'
        })
    } catch (error) {
        throw error;
    }
}