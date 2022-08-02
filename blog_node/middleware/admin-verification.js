const jwt = require("jsonwebtoken");
const config = process.env;

const adminv = (req, res, next) => {
  // console.log(req.cookies['x-access-token'])
  let token =
    req.body.token || req.query.token || req.cookies['x-access-token'];
   const user = req.cookies['user-info'];
  //  console.log(user[0].role)

  if (!token) {
    // return res.status(403).send("A token is required for authentication");
    res.redirect('/404');
  }
  else if(user[0].role == undefined){
    res.redirect('/404');
  }
  else if(user[0].role == 'admin'){
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}
  return next();
};

module.exports = adminv;