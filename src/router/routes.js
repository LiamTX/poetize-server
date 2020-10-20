const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');

const UserController = require('../controller/UserController');

//Public
router.post('/api/users', UserController.store);
router.post('/api/users/auth', UserController.auth);
router.post('/api/users/forgot_password', UserController.forgotPassword);
router.post('/api/users/reset_password', UserController.resetPassword);

//Private
router.use(auth);
router.get('/api/users', UserController.index);

module.exports = router;