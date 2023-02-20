const express= require('express');
const {UserModel}= require("../model/User.model");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");

const userRouter= express.Router();

userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,password,age,city}= req.body;
    try {
        bcrypt.hash(password,5, async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong","error":err.message});
            }
            else{
                const user= new UserModel({name,email,gender,age,city,password:hash});
                await user.save();
                res.send({"msg":"New User has been registered"}) 
            }
        }) 
    } 
    catch (error) {
        res.send({"msg":"Something went wrong","error":error.message})   
    }
    res.send("User Register sucessfully!");
})

userRouter.post("/login", async(req,res)=>{
   const {email,password}= req.body;
   try {
    const user= await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password, user[0].password, (err,result)=>{
          if(result){
            let token= jwt.sign({userId:user[0]._id},"jagriti")
            res.send({"msg":"Logged in successfully","token":token})
          }
          else{
            res.send({"msg":"Wrong Credential"});
          }
        })
    }
    else{
        res.send({"msg":"Wrong Credential"}); 
    }
   } 
   catch (error) {
     res.send({"msg":"Something went wrong","error":error.message})
   }
})


module.exports={
    userRouter
}