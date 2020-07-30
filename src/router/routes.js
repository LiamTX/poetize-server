const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const user = require('../controller/userController');
const poem = require('../controller/poemController');

router
    .get('/api/users', user.index)
    .post('/api/users', user.store)
    .post('/api/users/auth', user.auth)
    .post('/api/poems', poem.store)

router.use(auth);

router
    .get('/api/poems', poem.index)
    .delete('/api/poems/:id', poem.delete)

module.exports = router;