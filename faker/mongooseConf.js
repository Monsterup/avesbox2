const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongooseConf = (callback) => {
    mongoose.connect(`${process.env.DB_URL}?retryWrites=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, function (error) {
        if (error)
            console.log(error);
    }).then((res) => callback(res));
};

exports.mongooseConf = mongooseConf;