const mongoose = require("mongoose")
const usersSchema = mongoose.Schema({
    uid: String,
    email: String,
    name: String,

});
module.exports = mongoose.model("FB_data", usersSchema);