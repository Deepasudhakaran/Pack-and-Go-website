
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const userAuthMiddleware = require('../Middlewares/userAuth');

router.post('/signup', userController.signUp);
router.post('/login', userController.userLogin);
router.post('/search', userAuthMiddleware, userController.handleSearch);
router.post('/createreview/:postId', userController.Createuserreview);

router.post('/createmessage', userController.Createusermessage);

router.get('/user/postlist', userController.getPostList);
router.get('/userheader', userAuthMiddleware, userController.userHeader);
router.get('/postdetails/:id', userAuthMiddleware, userController.getDetails);
router.get('/reviewlist/:postId', userController.getUserReviewList);

module.exports = router;


