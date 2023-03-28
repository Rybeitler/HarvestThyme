const mongoose = require('mongoose')



const OrderSchema = new mongoose.Schema({
    items:[{
        id:{
            type:mongoose.Schema.Types.ObjectId
        },
        quantity:{
            type:Number,
            default:0
        }
    }],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    email:{
        type:String
    },
    firstName:{
        type:String
    },
    total:{
        type:Number,
        default:0
    },
    pickUp:{
        type:String
    },
    state:{
        type:String,
        default:'placed',
        enum:[
            'placed',
            'ready',
            'completed'
        ]
    }
}, {timestamps:true})

module.exports = mongoose.model('Order', OrderSchema)