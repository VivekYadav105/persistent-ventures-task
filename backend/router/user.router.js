const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sendVerificationMail,sendForgotEmail} = require('../utils/sendMail')
const {client} = require('../utils/db')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/login',async(req,res,next)=>{
    try{
        const {email,password} = req.body
        const user = await client.user.findFirst({where:{email}})
        if(!user){
            res.statusCode = 400
            throw new Error("Credentials doesn't match")
        }
        const hashedPassword = await bcrypt.compare(password,user.password)
        if(!hashedPassword){
            res.statusCode = 400
            throw new Error("Credentials doesn't match")
        }
        const {password:userPassword,...userDoc} = user
        const token = jwt.sign(userDoc,process.env.JWT_SECRET_MAIN,{expiresIn:'1h'})
        return res.json({message:"User Logged In succssfully",token:token})
    }
    catch(err){
        next(err)
    }
})

router.get('/credLeft',auth,async(req,res,next)=>{
    const user = await client.user.findUnique({where:{email:req.user.email}})
    return res.json({message:"Credits Left",credits:user.creditsLeft})
})

router.post('/signup',async(req,res,next)=>{
    try{
        const {password,fname,lname,email} = req.body
        const existingUser = await client.user.findUnique({where:{email}})
        
        let token;
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists")
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            token = jwt.sign({fname,lname,password:hashedPassword,email},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
            let name = fname + " " + lname||''
            await sendVerificationMail(email,name,token)
        }
        return res.status(201).json({message:"please check your email for verification link"})
    }
    catch(err){
        next(err)
    }
})

router.post('/forgot',async(req,res,next)=>{
    try{
        const {email} = req.body
        const user = await client.user.findUnique({where:{email}})
        if(!user){
            console.log("user not found");
            return res.json({message:"Please check the mobile for the otp code"})
        }
        const token = jwt.sign({id:user.userId,mode:'resetPassword'},process.env.JWT_SECRET_TEMP,{expiresIn:'10m'})
        user.token = token;
        const updatedUser = await client.user.update({where:{email},data:{token}})
        await sendForgotEmail(user.email,token)
        return res.json({message:`check your email for reset link`,token:token})
    }
    catch(err){
        next(err)
    }
})

router.post('/create',async(req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        console.log("token:",token);
        const payload = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const existingUser = await client.user.findUnique({where:{email:payload.email}})
        if(existingUser){
            res.statusCode = 409
            throw new Error("User alreasy exists or username is taken")
        }
        const userId = `UN${Date.now()}`
        const {iat,exp,...data} = payload
        const user = await client.user.create({data:{...data,userId}})
        return res.json({message:"User Created Successfully",user})
    }catch(err){
        console.log(err);
        switch(err.name){
            case 'JsonWebTokenError':
                res.statusCode = 403
                err.message = "Invalid Token"
                break;
            case 'TokenExpiredError':
                res.statusCode = 403
                err.message = "Token Expired"
        }
        next(err)
    }
})

router.get('/verifyToken',async(req,res,next)=>{
    try{
        log
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.statusCode = 403
            throw new Error("Session Expired")
        }
        const payload = jwt.verify(token,process.env.JWT_SECRET_MAIN)
        return res.json({message:"Token Verified Successfully"})
    }catch(err){
        switch(err.name){
            case 'JsonWebTokenError':
                err.message = "Invalid Token"
                break;
            default:
                err.message = "Session Expired"
                break;
        }
        next(err)
    }
})

router.post('/reset',async(req,res,next)=>{
    try{
        const {password} = req.body
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('Session Expired')
        }
        const token = req.headers.authorization.split(' ')[1]
        const {id} = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        const user = await client.user.findUnique({where:{userId:id}})
        if(user.token!=token){
            res.statusCode = 403
            throw new Error("session expired or Invalid token")
        }
        if(!user){
            res.statusCode = 403
            throw new Error("Session Expired. Please try again!!")
        }
        const newpassword = await bcrypt.hash(password,10)
        const updatedUser = await client.user.update({where:{userId:id},data:{password:newpassword,token:null}})
        return res.json({message:`Password reset sucessfully`})
    }catch(err){
        next(err)
    }
})

router.get('/reset/:token',async(req,res,next)=>{
    try{
        const token = req.params.token
        const success = jwt.verify(token,process.env.JWT_SECRET_TEMP)
        return res.json({message:'correct token'})
    }
    catch(err){
        res.statusCode = 403
        err.message = 'Session Expired or invalid token'
        next(err)
    }
})


module.exports = router