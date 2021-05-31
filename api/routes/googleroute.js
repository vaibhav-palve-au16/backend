require('dotenv').config()
const express = require('express');
const passport = require("passport")
require('../../passportsetup/passport-setup')
const router = express.Router()
router.use(passport.initialize())
router.use(passport.session())
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.render('sucess');
    }
);
module.exports = router

