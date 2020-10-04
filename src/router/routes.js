const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const user = require('../controller/userController');
const poem = require('../controller/poemController');
const like = require('../controller/likeController');

//Dont need token
router
    .post('/api/users/auth', user.auth)
    .post('/api/users', user.store)
    .get('/api/users', user.index)
//Nedd token
router.use(auth);
router
    .get('/api/token', user.token)
    .get('/api/poems', poem.index)
    .post('/api/poems', poem.store)
    .get('/api/users/poems', user.getMyPoems)
    .put('/api/users', user.edit)
    .get('/api/users/token', user.getUser)
    .get('/api/poems/:id', poem.getPoemById)
    .put('/api/poems/like/:poem_id', poem.like)
    .put('/api/poems/deslike/:poem_id', poem.deslike)
    .get('/api/likes', like.index)
    .get('/api/likes/user', like.getByUser)
    .delete('/api/poems/:id', poem.delete)

module.exports = router;