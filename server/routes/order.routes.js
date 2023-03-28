const OrderController = require('../controllers/order.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) =>{
    app.post('/api/createOrder',  OrderController.createOrder)
    app.get('/api/allOrders', OrderController.getAllOrders)
    app.get('/api/userOrders', OrderController.getOrdersByUser)
    app.delete('/api/deleteOrder/:id', OrderController.deleteOrder)
    app.put('/api/updateOrderState/:id', OrderController.updateOrderState)
}