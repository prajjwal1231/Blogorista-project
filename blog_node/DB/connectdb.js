const mongoose = require('mongoose');
const database = 'mongodb+srv://prajjwal1231:prajjwal123@cluster0.y44idre.mongodb.net/blognode?retryWrites=true&w=majority'


const connectdb = ()=>{
    return mongoose.connect("mongodb://localhost:27017/blog_data")//blog_data db ka naam hai 
    .then(()=>{
        console.log('mongoDB se connect ho gya hai ')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports={
    connectdb
}