const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products.js')
const orderRoutes = require('./api/routes/orders.js')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/orders', orderRoutes)
app.use('/products', productRoutes)

app.use((res,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
})

app.use((req,res,next)=>{
    const error = new Error('not found - 404')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: error.status
    })
})


module.exports = app;