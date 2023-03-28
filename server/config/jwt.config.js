const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) =>{
    jwt.verify(req.cookies.accessToken, SECRET, (err, payload)=>{
        if(err){
            res.status(401).json({verified: false})
        }else{
            req.user = payload.id;
            next();
        }
    })
}