const BlogadsModel = require('../models/blogads.js');
const BloginsertModel = require('../models/bloginsert.js');
class blogadsController{
    static adsdisplay = async(req,res)=>{
        const result = await BlogadsModel.find();
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('blog/blogads',{data:result,token1:token,display:display});
    }
    static Blogadsinsert = async(req,res)=>{
        // console.log(req.body);
         // console.log(req.params.id)
        try{
        const result = await BloginsertModel.findById(req.params.id)
           
            const doc = new BlogadsModel({
                title:result.title,
                description:result.description,
                created_by:result.created_by,
                blog_id:result._id,
                image:result.image
            })
            //save data
            const result1 = await doc.save()
            res.redirect('/admin/display')
        }catch(err){
          console.log(err);
        }
}
static addelete = async(req,res)=>{
    const result = await BlogadsModel.deleteOne({ _id: req.params.id });
    res.redirect('/blogads/display');
}
}

module.exports = blogadsController