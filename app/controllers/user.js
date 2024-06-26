import express from "express";
import users from '../schemas/userSchema.js';
import { jwtAuthMiddleware, generateToken } from '../middlewares/jwt.js';

//creating user
async function register(req, res, next)
{
    try{
        let rawData = req.body;
        let image = req.file
        let data = await users.create(rawData);
        // console.log(rawData);
         res.json("data inserted");
     }catch(err){
         console.log(err);
         next(err)
     }
}

//login user
async function login(req, res, next)
{
    try{
        let {email, password} = req.body;
        let user = await users.findOne({email : email}).select(+password);
        if(!user) return res.status(400).json({message : "email or password is not correct or null"});
        let pas = await users.findOne({password : password});
        if(!pas) return res.status(400).json({message : "email or password is not correct or null"});
        const payload = { id : user._id , email: user.email };
        const token = generateToken(payload);
        // console.log('token',token);
        res.json({data: {user, token}}); 
     }catch(err){
         console.log(err);
         res.status(400).send(err);
     }
}

export  {register, login};