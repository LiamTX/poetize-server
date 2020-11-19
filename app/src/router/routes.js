const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');

const UserController = require('../controller/UserController');
const PoemController = require('../controller/PoemController');


router.get('/', (req, res) => res.json('Hello app'));
//Public
//Users
router
.post('/api/users', UserController.store)
.get('/api/users', UserController.index)
.post('/api/users/auth', UserController.auth)
.post('/api/users/forgot_password', UserController.forgotPassword)
.post('/api/users/reset_password', UserController.resetPassword)
.post('/api/users/upload_avatar', UserController.uploadAvatar);

//Private
router.use(auth);
//Users
router
.get('/api/users/this', UserController.getThis)
.put('/api/users', UserController.update)
.get('/api/users/likes', UserController.getMyLikes)
.post('/api/users/faq', UserController.FAQ);
//Poems
router
.get('/api/poems', PoemController.index)
.get('/api/poems/my', PoemController.getByUser)
.post('/api/poems', PoemController.store)
.delete('/api/poems/:poem_id', PoemController.delete)
.post('/api/poems/like/:id', PoemController.like)
.delete('/api/poems/like/:id', PoemController.dislike)
.get('/api/poems/like/:poem_id', PoemController.getMyLikes)
.get('/api/poems/:poem_id', PoemController.getById);

module.exports = router;