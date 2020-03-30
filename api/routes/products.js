const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: "Hello world!"
    })
})

router.post('/', (req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        test: "Handling Post Requests to /products",
        createdProduct: product
    })
})

router.patch('/:productID', (req,res,next) => {
    res.status(200).json({
        message: "update product"
    })
})

router.delete('/:productID', (req,res,next) => {
    res.status(200).json({
        message: "Deleted product!"
    })
})

module.exports = router;