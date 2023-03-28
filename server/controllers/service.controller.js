const Service = require('../models/service.model')
const cloudinary = require('../config/cloudinary.config')

module.exports = {
    addService: async(req, res)=>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'HarvestThyme'});
            const newService = {
                name: req.body.name,
                description: req.body.description,
                email: req.body.email,
                phone: req.body.phone,
                image: result.secure_url,
                cloudinary: result.public_id
            }
            const service = await Service.create(newService)
            res.json(service)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    allServices: async (req, res)=>{
        try{
            const allServices = await Service.find()
            res.json(allServices)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    getOneService: async (req,res)=>{
        try{
            const service = await Service.findOne({_id:req.params.id})
            res.json(service)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    deleteService: async (req, res) =>{
        try{
            const service = await Service.findOne({_id:req.params.id})
            await cloudinary.uploader.destroy(service.cloudinary)

            await service.remove()
            res.json(service)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    editService: async(req, res) =>{
        try{
            const service = await Service.findOne({_id:req.params.id})
            
            await cloudinary.uploader.destroy(service.cloudinary)
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'HarvestThyme'});
            
            const editedService = {
                name: req.body.name,
                description: req.body.description,
                email: req.body.email,
                phone: req.body.phone,
                image: result?.secure_url || product.image,
                cloudinary: result?.public_id || product.cloudinary
            }
            
            const updatedService = await Service.findOneAndUpdate({_id:req.params.id}, editedService, {new:true})
            res.json(updatedService)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    editServiceNF: async (req, res) =>{
        try{
            const updatedService = await Service.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
            res.json(updatedService)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    }
}