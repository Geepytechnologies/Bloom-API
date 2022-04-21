const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connection successful")).catch((err)=>{
    console.log(err)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
app.listen(process.env.PORT || 5500, ()=>{
    console.log("Backend server is running")
});