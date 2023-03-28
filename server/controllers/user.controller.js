const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;
const {authenticate} = require('../config/jwt.config')

module.exports ={
    registerUser: async (req, res)=>{
        try{
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({error:{errors:{email:{message:'This email is in use.'}}}})
            }else{
                const newUser = req.body
                const refreshToken =  jwt.sign({_id:newUser._id}, SECRET, {expiresIn:'1d'})

                newUser.refreshToken = refreshToken
                const finalizedUser =  await User.create(newUser)
                const accessToken = jwt.sign({_id:newUser._id, email:newUser.email, name:newUser.firstName, access:finalizedUser.role}, SECRET, {expiresIn:'30m'})

                res.cookie('jwt', refreshToken, {httpOnly:true, secure: true, sameSite:'None', maxAge: 2 * 60 * 60 * 1000})
                res.status(201).json({success:'User logged in!', accessToken:accessToken, user:finalizedUser})
            }
        }
        catch(err){
            res.status(500).json({error:err})
        }
    },
    loginUser: async (req, res)=>{
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                
                const matchPass = await bcrypt.compare(req.body.password, user.password)
                if(matchPass){
                    const accessToken= jwt.sign({_id:user._id, email:user.email, name:user.firstName, access:user.role}, SECRET, {expiresIn:'30m'})
                    const refreshToken = jwt.sign({_id:user._id}, SECRET, {expiresIn:'1d'})
                    user.refreshToken = refreshToken
                    user.confirmPassword = user.password
                    const saveToken = await user.save()
                    res.cookie('jwt', refreshToken, {httpOnly:true, secure: true, sameSite:'None', maxAge: 2 * 60 * 60 * 1000})
                    res.status(201).json({success:'User logged in!', accessToken:accessToken, user:user})
                }else{
                    res.status(400).json({message:'Invalid email or password'})
                }
            }else{
                res.status(400).json({message: 'Invalid email or password'})
            }
        }
        catch(err){
            console.log('error', err)
            res.status(500).json({error:err})
        }
    },
    logout: async (req, res)=>{
        const cookies = req.cookies;
        
        if(!cookies?.jwt) return res.sendStatus(204)
        const refreshToken = cookies.jwt
        
        const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
        if(!foundUser){
            res.clearCookie('jwt', {httpOnly:true, sameSite: 'None', secure:true});
            return res.sendStatus(204)
        }
        foundUser.refreshToken ='';
        foundUser.confirmPassword = foundUser.password
        const result = await foundUser.save();
        

        res.clearCookie('jwt', {httpOnly:true, sameSite: 'None', secure: true})
        res.sendStatus(204)
    },
    verifyToken: async (req, res)=>{
        res.json({message:req.user})
    },
    handleRefreshToken: async (req, res) => {
        const cookies = req.cookies;
        
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
        if (!foundUser) return res.sendStatus(403); 


        jwt.verify(
            refreshToken,
            SECRET,
            (err, decoded) => {

                if (err || JSON.stringify(foundUser._id).replace(/['"]+/g, '') !== decoded._id) return res.sendStatus(403);
                const role = foundUser.role
                const user = {
                    _id:decoded._id,
                    firstName:foundUser.firstName,
                    role:foundUser.role
                }
                const accessToken = jwt.sign(
                    {
                        _id:decoded._id,
                        email: foundUser.email,
                        firstName:foundUser.firstName, 
                        role:foundUser.role
                    },
                    SECRET,
                    { expiresIn: '30m' }
                );
                res.json({ user, accessToken })
            }
        );
    }

    
}