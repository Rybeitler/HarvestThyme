const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')
require('./config/mongoose.config');
require('dotenv').config();


const app= express()
// app.use(fileUpload())
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const serviceRoutes = require('./routes/service.routes');
const orderRoutes = require('./routes/order.routes');

userRoutes(app);
productRoutes(app);
serviceRoutes(app);
orderRoutes(app);

app.listen(8000, ()=> console.log('Server is running on port 8000'));