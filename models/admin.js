const mongoose = require("mongoose")
const usersSchema = new mongoose.Schema({
    username: String,
    password: String,


});
const admindata = new mongoose.model("Admindata", usersSchema);
module.exports = admindata