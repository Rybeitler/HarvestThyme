const Order = require('../models/order.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

module.exports = {
    createOrder: async (req, res) =>{
        try{
            const order = req.body
            const decodedJwt = jwt.decode(req.cookies.jwt, {complete:true});
            const user_id = decodedJwt.payload._id
            const user = await User.findOne({_id:user_id})
            const completeOrder = {...order, user_id:user_id, email:user.email, firstName:user.firstName}
            const newOrder = await Order.create(completeOrder)
            res.json(newOrder)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    }, getAllOrders: async (req,res) =>{
        try{
            const allOrders = await Order.find().sort({pickUp:'asc'})
            res.json(allOrders)
        }
        catch(err){
            res.status.json({error:err})
        }
    },
    getOrdersByUser: async (req, res)=>{
        try{
            const decodedJwt = jwt.decode(req.cookies.jwt, {complete:true});
            const user_id = decodedJwt.payload._id
            const userOrders = await Order.find({user_id:user_id}).sort({pickUp:'asc'})
            res.json(userOrders)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    deleteOrder: async (req, res)=>{
        Order.deleteOne({_id: req.params.id})
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
        // try{
        //     const decodedJwt = jwt.decode(req.cookies.jwt, {complete:true});
        //     const user_id = decodedJwt.payload._id
        //     const user = await User.findOne({_id:user_id})
        //     const order = await Order.findOne({_id:req.params.id})
        //     console.log( )
            
        //     if(JSON.stringify(user._id) === JSON.stringify(order.user_id) || user.role==='employee'){
        //         let result = await Order.deleteOne({_id:req.params.id})
        //         console.log(result)
        //         res.json(result)
        //     }else{
        //         return res.sendStaus(403)
        //     }
        // }
        // catch(err){
        //     res.status(500).json({error:err})
        // }
    },
    updateOrderState: async (req, res)=>{
        try{
            const updatedState = {
                state: req.body.state
            }
            const updated = await Order.findOneAndUpdate({_id:req.params.id}, updatedState, {new:true})
            
            res.json(updated)
        }
        catch(err){
            res.status(500).json({error:err})
        }
    }
}