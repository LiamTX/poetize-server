const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const user = require('../controller/userController');
const poem = require('../controller/poemController');

router
    //User
    .get('/api/users', user.index)
    .post('/api/users', user.store)
    .post('/api/users/auth', user.auth)
    
router.use(auth);

router
    //Poem
    .get('/api/poems', poem.index)
    .post('/api/poems', poem.store)

module.exports = router;