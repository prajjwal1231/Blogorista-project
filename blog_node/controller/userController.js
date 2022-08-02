const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserModel = require('../models/user');
class UserController{
  static register = async(req, res)=>{
    try{
  var newUser = new User(req.body);
  newUser.hash_password = await bcrypt.hash(req.body.password, 10);
  newUser.token = "tokens ready"
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      // return res.json(user);
    }
    res.redirect('/');
  });
}catch(err){
  console.log(err);
}
}

// static sign_in = async(req, res)=>{
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//     if (err) throw err;
//     if (!user || !user.comparePassword(req.body.password)) {
//       return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
//     }
//     // return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
//     res.redirect('/');
//   });
// }
static sign_in = async (req,res) => {
   try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.hash_password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const result = await UserModel.findByIdAndUpdate(user._id,{
            token:token,
            })
            await result.save()
      // save user token
      // user.token = token;
      console.log(token);
      res.cookie('x-access-token',token);
      // user
      // res.status(200).json(user);
      res.redirect('/');
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}



}
module.exports = UserController;