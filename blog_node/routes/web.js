const express = require('express');
const frontController = require('../controller/frontController');
const insertController = require('../controller/insertController');
const blogadsController = require('../controller/blogadsController');
const router = express.Router();
const UserController = require('../controller/userController');
const adminController = require('../controller/adminController');
const contactController = require('../controller/contactController');

router.get('/',frontController.home);
router.get('/about', frontController.about);
router.get('/contact', frontController.contact);
router.get('/blog', frontController.blog);
router.get('/login', frontController.login);
router.get('/sign_up', frontController.sign_up);
router.get('/blog_details/:id', frontController.blog_details);
router.get('/logout', frontController.logout);
router.get('/404', frontController.notfound);

//blog controller
router.get('/blog/create',insertController.createDoc)
router.get('/blog/display/:id',insertController.getAllDoc)
router.post('/blog/insert',insertController.Binsert)
router.get('/blog/edit/:id',insertController.Bedit)
router.get('/blog/view/:id',insertController.Bview)
router.post('/blog/update/:id',insertController.Bupdate)
router.get('/blog/delete/:id',insertController.bdelete)


//blogads controller
router.get('/blogads/display',blogadsController.adsdisplay)
router.get('/blogads/create/:id',blogadsController.Blogadsinsert)
router.get('/blogads/delete/:id',blogadsController.addelete)

//admin controller
router.get('/admin/display',adminController.getAllDoc);
router.get('/admin/checkp/:id',adminController.checkp);

//contact controller
router.post('/contact/insert',contactController.contactinsert);
router.get('/contact/view/:id',contactController.contactview);
router.get('/contact/display',contactController.contactdisplay);
router.get('/contact/delete/:id',contactController.contactdelete);

// router.post('/tasks',UserController.loginRequired, UserController.profile);
router.post('/auth/register',UserController.register);
router.post('/auth/sign_in',UserController.sign_in);
// router.post('/tasks22',UserController.profile);
module.exports = router;