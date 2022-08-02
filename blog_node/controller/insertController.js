const BloginsertModel = require('../models/bloginsert.js');
const UserModel = require('../models/user.js');
// const { param } = require('../routes/web.js');
// //model import
class insertController{

    static getAllDoc = async(req,res)=>{
        try{
        const result = await BloginsertModel.find({created_id:req.params.id});
        // console.log(result);
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        const datat = req.cookies['check-token']; //admincontroller part
        // console.log(display);
        res.render('blog/display',{data:result,token1:token,display:display,data54:datat});
        }catch(err){
            console.log(err);
        }
    }

    static createDoc = async(req,res)=>{
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('blog/create',{token1:token,display:display});
    }

    static Binsert = async(req,res)=>{
        // console.log(req.body);
        try{
            const {title,description,ads_check} = req.body
            const token2 = req.cookies['x-access-token'];
            const name = await UserModel.find({token:token2});
            // console.log(name[0].fullName);
            const doc = new BloginsertModel({
                title:title,
                description:description,
                created_by:name[0].fullName,
                created_id:name[0]._id,
                advertise:ads_check,
                image:req.file.filename
            })
            //save data
            const result = await doc.save()
            res.redirect('/blog/create')
        }catch(err){
          console.log(err);
        }
    }

    static Bview = async(req,res)=>{
        // console.log(req.params.id)
        try{
        const result = await BloginsertModel.findById(req.params.id);
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('blog/view',{data:result,token1:token,display:display});
        }catch(err){
            console.log(err);
        }
    }

    static Bedit = async(req,res)=>{
        // console.log(req.params.id)
        try{
        const result = await BloginsertModel.findById(req.params.id)
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('blog/edit',{data:result,token1:token,display:display});
        }catch(err){
            console.log(err);
        }
    } 

    static Bupdate = async(req,res)=>{
        // console.log(req.body);
        try{
        if(req.file) {const imagefile = req.file.filename;
            const result = await BloginsertModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:imagefile,
                })
                // console.log(result);
                await result.save()
                res.redirect('/blog')}
        else{
        const result = await BloginsertModel.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        })
        await result.save()
        res.redirect('/blog')
    }
        // res.render('blog/view',{data:result});
        }catch(err){
            console.log(err);
        }
    }
    static bdelete = async(req,res)=>{
        const result = await BloginsertModel.deleteOne({ _id: req.params.id });
        const token = req.cookies['x-access-token'];
        const result2 = await UserModel.find({token:token});
        console.log(result2[0]._id);
        res.redirect('/blog/display/'+result2[0]._id);
    }
}



module.exports = insertController