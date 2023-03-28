const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'Please enter a service name']
    },
    description:{
        type:String, 
        required:[true, 'Please give a short description'],
    },
    email:{
        type:String,
        reqired:[true, "Please provide a valid email"]
    },
    phone:{
        type:String,
        required:[true, "Please provide a valid phone number"]
    },
    image:{
        type:String
    },
    cloudinary:{
        type:String
    }
}, {timestamps:true})

module.exports = mongoose.model('Service', ServiceSchema)