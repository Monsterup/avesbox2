const { sign } = require ('jsonwebtoken');

exports.createAccessToken = (user) => {
  return sign({userId: user.id}, process.env.APP_KEY, {
    expiresIn: "30m"
  });
}

exports.createRefreshToken = (user) => {
  return sign(
  {userId: user.id, tokenVersion: user.tokenVersion}, 
  process.env.APP_REFRESH_KEY, 
  {
    expiresIn: "7d"
  });
}