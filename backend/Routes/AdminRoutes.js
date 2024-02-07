const express = require("express");
const router = express.Router();
const adminController = require('../Controllers/AdminController');
const uploadMultiple = require('../Middlewares/multer');
const adminAuthMiddleware = require("../Middlewares/adminAuth");


router.post('/adminlogin', adminController.adminLogin);
router.post('/createpost', uploadMultiple, adminController.viewPost);
router.post('/adminsignup', adminController.AdminsignUp);


router.put('/admin/block/:userId', adminController.blockUser);
router.put('/admin/unblock/:userId', adminController.unblockUser);
router.put('/updateadminpostdetails/:id', uploadMultiple, adminController.updatePost);


router.get('/adminheader', adminAuthMiddleware, adminController.adminHeader);
router.get('/admin/userlist', adminAuthMiddleware, adminController.getUserList);
router.get('/admin/postlist', adminAuthMiddleware, adminController.getAdminList)
router.get('/adminpostdetails/:id', adminController.getAdminDetails);
router.get('/adminreviewlist/:postId', adminController.getAdminReviewList);
router.get('/admincreatemessage', adminAuthMiddleware, adminController.getAdminNotificationList);

router.delete('/adminreviewlist/:postId', adminController.deleteReview);
router.delete('/adminpostdetails/:id', adminController.deletePost);



module.exports = router;
