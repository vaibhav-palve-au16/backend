require('dotenv').config()
const express = require('express');
const passport = require("passport")
require("../../passportsetup/facebook_setup")
const session = require('express-session')
const FB_data = require("../../models/facebook")
const router = express.Router()
router.use(passport.initialize())
router.use(passport.session())
router.use(session({ secret: "thisissecretkey", resave: true, saveUninitialized: true }))

router.get('/facebook', passport.authenticate('facebook', { scope: "email" }))

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failure' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.render('sucess');
    }
)
router.get('/failure', (req, res) => {
    res.status(400).send("can not login ")
})




module.exports = router

