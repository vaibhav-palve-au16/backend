require('dotenv').config()
const express = require("express")
const router = express.Router()
const Register = require('../../models/register')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
// const nodeMailer = require("../../Nodemailer/mailer")

router.get('/about', (req, res) => {
    res.render("about")
})



router.get('/signup', (req, res) => {
    // console.log(signupPath)
    res.render('signup')
})

router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/", (req, res) => {
    res.render("navbar")
})

// logic for signup check both the password are same or not 

router.post('/signup', async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirm;
        const email = req.body.email;
        const useremail = await Register.findOne({ email: email })
        if (useremail) {
            res.send("email id already exists")
        }

        else if (password === cpassword) {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }

            });
            var mailOptions = {
                from: "vaibhavpalve1234@gmail.com",
                to: req.body.email,
                subject: "sending mail using nodejs",
                text: `Your userEmail is ${req.body.email} and password is ${req.body.password}`

            }
            const G = await (transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("email sent: " + info.response);
                }
            }));


            const registerUser = new Register({
                Username: req.body.Username,
                email: req.body.email,
                password: req.body.password,
                confirm: req.body.confirm,
            })

            // implementing hashing of password

            const registered = await registerUser.save()
            res.status(201).render("login");

        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        console.log(error)
        res.status(400).send();
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // this is query of mongo db 
        const useremail = await Register.findOne({ email: email });
        console.log(useremail)

        // adding logic for comparing the bcrypt password

        const isMatch = await bcrypt.compare(password, useremail.password)
        console.log(isMatch)
        // isMatch will return true or false 

        if (isMatch) {
            res.status(201).render("sucess")
        } else {
            res.send("invalid login details");
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("invalid login details")
    }

})



module.exports = router

