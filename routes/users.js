const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


// Renders register form
// Registers new user
router.route('/register')
    .get(
        users.renderRegisterForm)
    .post(
        catchAsync(users.registerUser)
);


// Renders login form
// Logs user in
router.route('/login')
    .get(
        users.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate(
            'local',
            { failureFlash: true, failureRedirect: '/login' }),
        users.login
);


// Logs user out
router.get('/logout',
    users.logout
);


module.exports = router;