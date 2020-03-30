const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product.js')

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: "Hello world!"
    })
})

router.post('/', (req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))

    res.status(200).json({
        test: "Handling Post Requests to /products",
        createdProduct: product
    })
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId

    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json("from database" + doc)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.delete('/:productID', (req,res,next) => {
    res.status(200).json({
        message: "Deleted product!"
    })
})

module.exports = router;