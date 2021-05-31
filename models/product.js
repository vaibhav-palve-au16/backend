const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookname: {
        type: String,
        required: true
    },
    booktype: {
        type: String,
        required: true
    },
    bookprice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);