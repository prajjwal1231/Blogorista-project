const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var cookieParser = require('cookie-parser')
var path = require('path')
app.use(cookieParser())
require("dotenv").config();
// const port = 3000
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT ;
const jsonwebtoken = require("jsonwebtoken");
const User = require('./models/user');
const jb = require('./middleware/token-verification');
const adminv = require('./middleware/admin-verification')
//import router
const web = require('./routes/web.js');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const upload = require('./middleware/image-middleware.js');
//ejs setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//static engine
app.use(express.static('public'));

//connecting db
const {connectdb} = require('./DB/connectdb.js');
// connect db here 
connectdb()
//Using Middleware
app.use('/blog/insert',upload)
app.use('/blog/update/:id',upload)
//Verification Middleware
app.use('/blog/create',jb)
app.use('/blog/display',jb)
app.use('/blog/insert',jb)
//admin verification middleware
app.use('/admin/display',adminv)
app.use('/blogads/display',adminv)
app.use('/contact/display',adminv)
app.use('/contact/view/:id',adminv)

//load router
app.use('/', web)

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      console.log("AGAYA TOKEN ")
      next();
    });
  } else {
    req.user = undefined;
    // console.log("HOKAR GAYA TOKEN ")
    next();
  }
});

var routes = require('./routes/userRoute');


routes(app);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})