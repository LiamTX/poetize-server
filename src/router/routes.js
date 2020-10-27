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
//Poems

//Private
router.use(auth);
//Users
router.get('/api/users', UserController.index);
//Poems
router.get('/api/poems', PoemController.index);
router.post('/api/poems', PoemController.store);
router.delete('/api/poems/:poem_id', PoemController.delete)

module.exports = router;