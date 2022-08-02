const mongoose = require('mongoose');

const BlogadsSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    image:{type:String, required:true, trim:true},
    created_by:{type:String, required:false, trim:true},
    blog_id:{type:String, required:true, trim:true},
       join:{type:Date,default :Date.now}
   },{timestamps:true})

   //model create
   const BlogadsModel = mongoose.model('blogads',BlogadsSchema)

   module.exports = BlogadsModel