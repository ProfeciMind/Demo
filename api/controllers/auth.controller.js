 import { errorHandler } from "../error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'


export const signup = async (req,res,next)=>{
console.log("Reach");

    const {username,email,passwprd}= req.body;
    console.log(req.body);
    
    const hashedPassword = bcryptjs.hashSync(passwprd,10);
    const newUser=new User({username,email,password:hashedPassword});
    try{

    await newUser.save();
    res.status(201).json("User created successfully")
    }catch(error){
        next(error);
    }
};