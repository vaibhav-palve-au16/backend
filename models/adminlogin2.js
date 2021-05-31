const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    bookname: String,
    bookdes: String,

})
const Bookdata = new mongoose.model("Bookdata", adminSchema)
module.exports = Bookdata