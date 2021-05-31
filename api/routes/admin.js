const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const AdminData = require("../../models/admin")
router.get("/admin", (req, res) => {
    res.render('adminlogin.hbs')

})
router.post("/admin", async (req, res) => {
    try {
        console.log(req.body.userID)
        console.log(req.body.password)
        const username = req.body.userID
        const password = req.body.password
        // const user = await AdminData.findOne({ password: password });
        const user = 'vaibhav';
        if (user) {
            res.render("adminlogin2.hbs")
        } else {
            res.send("Invalid Credentials")
        }
    } catch (err) {
        console.log(err)
    }


})


module.exports = router

