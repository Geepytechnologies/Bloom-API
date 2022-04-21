const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const cryptoJS = require('crypto-js');
const cart = require('../models/cart');

//CREATE CART
router.post('/', verifyToken, async (req,res)=>{
    const newCart = new cart(req.body);
    try{
       const savedCart = await newCart.save();
       res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try{
       const updatedCart = await cart.findByIdAndUpdate(req.params.id,{
           $set: req.body
       },{new: true});
       res.status(200).json(updatedCart)
    }catch(err) {
       res.status(500).json(err);
    }
})

// DELETE CART
router.delete('/:id',verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(200).json("cart has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

// GET CART
router.get('/find/:userid', verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const UserCart = await cart.findOne({userid: req.params.userid});
        res.status(200).json(UserCart)    
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL CART
router.get('/',verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await cart.find();
        
        res.status(200).json(carts)    
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;