const ContactModel = require("../models/contact");
const UserModel = require("../models/user");

class contactController{
    static contactinsert = async(req,res)=>{
        // console.log(req.body);
        try{
            const {name,email,phone,message} = req.body
            const token2 = req.cookies['x-access-token'];
            const user1 = await UserModel.find({token:token2});
            // console.log(name[0].fullName);
            // console.log(req.body);
            const doc = new ContactModel({
                name:name,
                email:email,
                phone:phone,
                message:message,
                user_id:user1[0]._id,
            })
            //save data
            const result = await doc.save()
            res.redirect('/contact')
        }catch(err){
          console.log(err);
        }
    }
    static contactdisplay = async(req,res)=>{
        const result = await ContactModel.find();
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('contact/contact_display',{data:result,token1:token,display:display})
    }

    static contactview = async(req,res)=>{
        // console.log(req.params.id);
        try{
        const result = await ContactModel.findById(req.params.id);
        const token = req.cookies['x-access-token'];
        const display = req.cookies['user-info'];
        res.render('contact/contact_view',{data:result,token1:token,display:display})
        }catch(err){
            console.log(err);
        }
    }
    static contactdelete = async(req,res)=>{
        const result = await ContactModel.deleteOne({ _id: req.params.id });
        const token = req.cookies['x-access-token'];
        const result2 = await UserModel.find({token:token});
        // console.log(result2[0]._id);
        res.redirect('/contact/display/');
    }
}
module.exports = contactController