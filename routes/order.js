const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const cryptoJS = require('crypto-js');
const order = require('../models/order');

//CREATE ORDER
router.post('/', verifyToken, async (req,res)=>{
    const newOrder = new order(req.body);
    try{
       const savedOrder = await newOrder.save();
       res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE ORDER
router.put('/:id', verifyTokenAndAdmin, async (req,res)=>{
    try{
       const updatedOrder = await order.findByIdAndUpdate(req.params.id,{
           $set: req.body
       },{new: true});
       res.status(200).json(updatedOrder)
    }catch(err) {
       res.status(500).json(err);
    }
})

// DELETE ORDER
router.delete('/:id',verifyTokenAndAdmin, async (req,res)=>{
    try{
        await order.findByIdAndDelete(req.params.id);
        res.status(200).json("order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

// GET USER ORDER
router.get('/find/:userid', verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const UserOrder = await order.find({userid: req.params.userid});
        res.status(200).json(UserOrder)    
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL ORDERS
router.get('/',verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await order.find();
        
        res.status(200).json(orders)    
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;