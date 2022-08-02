const jwt = require("jsonwebtoken");
const config = process.env;

const jb = (req, res, next) => {
  // console.log(req.cookies['x-access-token'])
  let token =
    req.body.token || req.query.token || req.cookies['x-access-token'];

  if (!token) {
    // return res.status(403).send("A token is required for authentication");
    res.redirect('/404');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = jb;