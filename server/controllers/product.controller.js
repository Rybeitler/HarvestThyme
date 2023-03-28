const Product = require('../models/product.model')
const cloudinary = require('../config/cloudinary.config')


module.exports ={
    addProduct: async (req, res) =>{
        try{
            
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'HarvestThyme'});
            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price:req.body.price,
                category: req.body.category,
                image: result.secure_url,
                cloudinary: result.public_id
            } 
            const product = await Product.create(newProduct)
            res.json(product)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    allProducts: async (req,res)=>{
        try{
            const allProducts = await Product.find()
            res.json(allProducts)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    getOneProduct: async (req,res)=>{
        try{
            const id = req.params.id
            const product = await Product.findOne({_id:id})
            res.json(product)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    deleteProduct: async (req, res)=>{
        try{
            const product = await Product.findOne({_id:req.params.id})
            await cloudinary.uploader.destroy(product.cloudinary)

            await product.remove()
            res.json(product)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    editProduct: async(req, res) =>{
        try{
            const product = await Product.findOne({_id:req.params.id})
            
            await cloudinary.uploader.destroy(product.cloudinary)
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'HarvestThyme'});
            
            const editedProduct = {
                name: req.body.name,
                description: req.body.description,
                price:req.body.price,
                category: req.body.category,
                image: result?.secure_url || product.image,
                cloudinary: result?.public_id || product.cloudinary
            }
            const updatedProduct = await Product.findOneAndUpdate({_id:req.params.id}, editedProduct, {new:true})
            res.json(updatedProduct)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    editProductNF: async (req, res) =>{
        try{
            const updatedProduct = await Product.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
            res.json(updatedProduct)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    }
}