const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');

const UserController = require('../controller/UserController');
const PoemController = require('../controller/PoemController');

//Public
//Users
router.post('/api/users', UserController.store);
router.post('/api/users/auth', UserController.auth);
router.post('/api/users/forgot_password', UserController.forgotPassword);
router.post('/api/users/reset_password', UserController.resetPassword);
router.post('/api/users/upload_avatar', UserController.uploadAvatar);
//Poems

//Private
router.use(auth);
//Users

router.get('/api/users', UserController.index);
router.get('/api/users/this', UserController.getThis);
router.put('/api/users', UserController.update);
router.get('/api/users/likes', UserController.getMyLikes);
router.post('/api/users/faq', UserController.FAQ);
//Poems
router.get('/api/poems', PoemController.index);
router.get('/api/poems/my', PoemController.getByUser);
router.post('/api/poems', PoemController.store);
router.delete('/api/poems/:poem_id', PoemController.delete);
router.post('/api/poems/like/:id', PoemController.like);
router.delete('/api/poems/like/:id', PoemController.dislike);
router.get('/api/poems/like/:poem_id', PoemController.getMyLikes);

module.exports = router;