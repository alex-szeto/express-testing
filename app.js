const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products.js')
const orderRoutes = require('./api/routes/orders.js')

mongoose.connect('mongodb+srv://Alex-Szeto:' + process.env.MONGO_ATLAS_PW + '@cluster0-3z397.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/orders', orderRoutes)
app.use('/products', productRoutes)

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method == "OPTIONS"){
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
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