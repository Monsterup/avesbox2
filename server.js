const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')
// const redis = require('./helpers/redis');
const user = require('./modules/user/routes');
const User = require('./models/user');
const cors = require('cors');
const { createAccessToken, createRefreshToken } = require('./helpers/auth');
const app = express();

dotenv.config();
app.use(cors({
  origin:"https://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "https://avesbox.herokuapp.com");
//     res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//     if (req.method === 'OPTIONS')
//         return res.sendStatus(200);
//     next();
// });

let port = process.env.PORT || 5000;
global.config_ = require('./config');

app.use(isAuth);
app.use('/graphql',
    graphqlHttp((req, res) => ({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
})));
app.use('/', user);
app.post('/refresh_token', async(req, res) => {
  const token = req.cookies.jid;
    console.log(token);
  if(!token){
    return res.send({ok:false, accessToken: '1'})
  }
  
  let payload = null;
  try{
    payload = jwt.verify(token, process.env.APP_REFRESH_KEY);
  } catch(error) {
    console.log(error);
    return res.send({ok:false, accessToken: '2'})
  }
  
  const user = await User.findById(payload.userId);
  if(!user) {
    return res.send({ok:false, accessToken: '3'})
  }
  // console.log(user);
  // console.log(payload);
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ok:false, accessToken: '4'})
  }
  
  res.cookie("jid", createRefreshToken(user), {
    httpOnly: true
  });
  
  const accToken = createAccessToken(user);
  
  return res.send({ok:true, accToken});
})

// redis.redisClient.on('connect', () => {
//     console.log('Redis connection successful');
// });

// redis.redisClient.on('error', err => {
// 	console.log(err);
// });

mongoose.connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    function (error) {
        if (error) console.log(error);

        console.log("connection successful");
    });

app.get('/test', (req,res) => {
    let House = require('./models/house');

    let house = new House();
    house.name = "Lorem Ipsum";
    house.save(function (err) {
        if (err)
            res.send(err);

        res.send({
            message: 'tambah data berhasil',
            data: house
        })
    });
});

app.listen(port, () => {
    console.log("App running on port " + port)
});