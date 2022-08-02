const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
     fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  role: {
    type: String
  },
token: {
  type: String
},
  created: {
    type: Date,
    default: Date.now
  }
   },{timestamps:true})

   UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

   //model create
   const UserModel = mongoose.model('userinsert',UserSchema)

   module.exports = UserModel