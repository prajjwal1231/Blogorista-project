const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    phone:{type:String, required:true, trim:true},
    message:{type:String, required:false, trim:true},
    user_id:{type:String, required:false, trim:true},
       join:{type:Date,default :Date.now}
   },{timestamps:true})

   //model create
   const ContactModel = mongoose.model('contactinsert',ContactSchema)

   module.exports = ContactModel