const multer  = require('multer')
const path= require('path')



var Storage= multer.diskStorage({   //function define hua hai
    destination:"./public/upload/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
var upload = multer({   //middle
    storage:Storage
}).single('image');

console.log("UPLOADED SUCCESSFULLY !!")

module.exports =upload