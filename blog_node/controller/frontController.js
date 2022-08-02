const BlogadsModel = require('../models/blogads.js');
const BloginsertModel = require('../models/bloginsert.js');
const UserModel = require('../models/user.js');
class frontController{
static home = async(req,res)=> {
    const result = await BloginsertModel.find();
    const result2 = await BlogadsModel.aggregate([{ $sample: { size: 2 } }]);
    const result3 = await BlogadsModel.aggregate([{ $sample: { size: 2 } }]);
    const token = req.cookies['x-access-token'];
    const display = await UserModel.find({token:token});
    res.cookie('user-info',display); //sending user-info
    res.render('home',{data:result,data2:result2,data3:result3,token1:token,display:display});
}

static about = async(req,res)=> {
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('about',{token1:token,display:display});
    
}

static blog = async(req,res)=> {
    const result = await BloginsertModel.find();
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('blog',{data:result,token1:token,display:display});
}

static blog_details = async(req,res)=> {
    const result = await BloginsertModel.findById(req.params.id);
    const random = await BloginsertModel.aggregate([{ $sample: { size: 5 } }]);
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('blog_details',{data:result,token1:token,display:display,rand:random});
}

static contact = async(req,res)=> {
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('contact',{token1:token,display:display});
}

static login = async(req,res)=> {
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('login',{token1:token,display:display});
}

static sign_up = async(req,res)=> {
    const token = req.cookies['x-access-token'];
    const display = req.cookies['user-info'];
    res.render('../views/user/signup',{token1:token,display:display});
}

static logout = async(req,res)=> {
    res.clearCookie("x-access-token");
    res.redirect('/');
    res.end();
    
}

static notfound = async(req,res)=> {
    res.render('404-notfound');
}
}
module.exports = frontController;