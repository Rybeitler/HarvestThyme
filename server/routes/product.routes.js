const ProductController = require('../controllers/product.controller')
const upload = require('../config/multer.config')
const cloudinary = require('../config/cloudinary.config')

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination:(req, file, cb) =>{
//         cb(null, '../client/public/uploads')
//     }, 
//     filename: (req, file, cb)=>{
//         const fileName = file.originalname.toLowerCase().split(' ').join('-')
//         cb(null, fileName)
//     }
// })
// const upload = multer({
//     storage:storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg, and .jpeg files are accepted'));
//         }
//     }
// })


module.exports = (app)=>{
    app.post('/api/addProduct', upload.single('file'),ProductController.addProduct)
    app.get('/api/allProducts', ProductController.allProducts)
    app.get('/api/oneProduct/:id', ProductController.getOneProduct)
    app.delete('/api/deleteProduct/:id', ProductController.deleteProduct)
    app.put('/api/editProduct/:id', upload.single('file'), ProductController.editProduct)
    app.put('/api/editProductNF/:id', ProductController.editProductNF )
}