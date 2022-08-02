const BlogadsModel = require("../models/blogads");
const BloginsertModel = require("../models/bloginsert");

class adminController{
static getAllDoc = async(req,res)=>{
    try{
    const result = await BloginsertModel.find();
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    const datat = req.cookies['check-token'];
    // console.log(datat[0]);
    const ads = await BlogadsModel.find();
    // console.log(ads[2].blog_id);
    res.render('blog/display',{data:result,token1:token,display:display,ads:ads,data54:datat});
    }catch(err){
        console.log(err);
    }
}

static checkp = async(req,res)=>{
    // console.log(req.params.id);
    const ads21 = await BlogadsModel.find({blog_id:req.params.id});
    res.cookie('check-token',ads21);
    res.redirect('back');

}
}
module.exports = adminController