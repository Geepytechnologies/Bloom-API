const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const cryptoJS = require('crypto-js');
const product = require('../models/product');

//ADD PRODUCT
router.post('/', verifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new product(req.body);
    try{
       const savedProduct = await newProduct.save();
       res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE PRODUCT
router.put('/:id', verifyTokenAndAdmin, async (req,res)=>{
    try{
       const updatedProduct = await product.findByIdAndUpdate(req.params.id,{
           $set: req.body
       },{new: true});
       res.status(200).json(updatedProduct)
    }catch(err) {
       res.status(500).json(err);
    }
})

// DELETE PRODUCT
router.delete('/:id',verifyTokenAndAdmin, async (req,res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

// GET Product
router.get('/find/:id', async (req,res)=>{
    try{
        const oneProduct = await product.findById(req.params.id);
        res.status(200).json(oneProduct)    
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL PRODUCTS
router.get('/',verifyTokenAndAdmin, async (req,res)=>{
    const queryNew = req.query.new
    const queryCategory = req.query.new
    try{
        let products;
        if(queryNew){
            products = await product.find().sort({createdAt: -1}).limit(5);
        }else if(queryCategory){
            products = await product.find({categories:{
                $in:[queryCategory],
            }})
        }else{
            products = await product.find();
        }
        res.status(200).json(products)    
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;