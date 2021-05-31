const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Product = require("../../models/product")
const Admindata = require("../../models/admin")


router.get('/products', (req, res, next) => {
    Product.find()
        .select("bookname bookprice booktype _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        bookname: doc.bookname,
                        bookprice: doc.bookprice,
                        booktype: doc.booktype,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + doc._id
                        }
                    }
                })
            };
            if (docs.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: "No product in the list"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


})
router.post('/products', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        bookname: req.body.bookname,
        booktype: req.body.booktype,
        bookprice: req.body.bookprice
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "CREATED PRODUCTS SUCESSFULLLY",
                createdProduct: {
                    bookname: result.bookname,
                    booktype: result.booktype,
                    bookprice: result.bookprice,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

})
router.get('/products/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .select('bookname bookprice booktype _id')
        .exec()
        .then(doc => {
            console.log("from database" + doc)
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: "get all the products",
                        url: 'http://localhost:5000/products'
                    }
                })
            } else {
                res.status(404).json({
                    message: 'No Valid entry found fo this id '
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})
router.patch('/products/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateops = {};
    for (const ops of req.body) {
        updateops[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate({ _id: id }, { $set: updateops })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "PRODUCT UPDATED",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/products/" + id

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
router.delete('/products/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product deleted",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/products"
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;