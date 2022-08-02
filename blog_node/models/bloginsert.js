const mongoose = require('mongoose');

const BloginsertSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    image:{type:String, required:true, trim:true},
    created_by:{type:String, required:false, trim:true},
    created_id:{type:String, required:false, trim:true},
    advertise:{type:String, required:false, trim:true},
       join:{type:Date,default :Date.now}
   },{timestamps:true})

   //model create
   const BloginsertModel = mongoose.model('bloginsert',BloginsertSchema)

   module.exports = BloginsertModel