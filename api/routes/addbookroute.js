const express = require("express");
const multer = require("multer")
const path = require("path");
const router = express.Router()
const mongoose = require("mongoose")
const Bookdata = require("../../models/adminlogin2")

router.post("/upload", async (req, res) => {
    try {
        const bookDetail = new Bookdata({
            bookname: req.body.bookname,
            bookdes: req.body.bookdes,
        })
        console.log(req.body.bookname)
        // console.log(Bookdescription)
        const created = await bookDetail.save()
        res.send("sucessfuly added the book in cart")

    } catch (err) {
        res.send(err)
    }
})




module.exports = router
