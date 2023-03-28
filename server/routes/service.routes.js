const upload = require('../config/multer.config')
const ServiceController = require('../controllers/service.controller')
const cloudinary = require('../config/cloudinary.config')



module.exports = (app)=>{
    app.post('/api/addService', upload.single('file'), ServiceController.addService)
    app.get('/api/allServices', ServiceController.allServices)
    app.get('/api/oneService/:id', ServiceController.getOneService)
    app.delete('/api/deleteService/:id', ServiceController.deleteService)
    app.put('/api/editService/:id', upload.single('file'), ServiceController.editService)
    app.put('/api/editServiceNF/:id', ServiceController.editServiceNF)
}