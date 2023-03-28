const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'Please enter a product name']
    },
    description:{
        type:String, 
        required:[true, 'Please give a short description'],
    },
    price:{
        type:Number,
        required:[true, 'Please provide a price'],
        min:[0.01, 'Price must be at least 1 penny!']
    },
    category:{
        type:String,
        required:true,
        enum:{values:['Flower', 'Fruit', 'Vegetable', 'Other'], message:'Please select a product category.'}
    },
    image:{
        type:String
    },
    cloudinary:{
        type:String
    }
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema)