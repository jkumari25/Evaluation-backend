const express= require('express');
const {PostModel}= require("../model/Post.model");

const postRouter= express.Router();

postRouter.get('/', async(req,res)=>{
    const posts= await PostModel.find();
    res.send(posts);
})

postRouter.post("/addpost", async(req,res)=>{
  const payload= req.body;
  try{
    const post= new PostModel(payload);
    await post.save();
    res.send({"msg":"Posts Created Successfully"});
  }
  catch(err){
    res.send({"msg":"Post not Added"})
  }
})

postRouter.patch("/update/:id", async(req,res)=>{
    const payload= req.body;
    const postId= req.params.id;
    const post= await PostModel.findOne({_id: postId});
    const userId_in_post= post.userId;
    const userId_doing_req= req.body.userId;

    try {
       if(userId_doing_req !== userId_in_post){
        res.sendStatus({"msg":"You are not allowed to update the data"})
       } 
       else{
        await PostModel.findByIdAndUpdate({_id:postId},payload)
        res.send({"msg":`Post with id: ${postId} has been updated`});
       }
    } 
    catch (error) {
       res.send({"msg":"Something went wrong"}) 
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    const postId= req.params.id;
    const post= await PostModel.findOne({_id: postId});
    const userId_in_post= post.userId;
    const userId_doing_req= req.body.userId;

    try {
       if(userId_doing_req !== userId_in_post){
        res.sendStatus({"msg":"You are not allowed to update the data"})
       } 
       else{
        await PostModel.findByIdAndDelete({_id:postId})
        res.send({"msg":`Post with id: ${postId} has been deleted`});
       }
    } 
    catch (error) {
       res.send({"msg":"Post not Deleted"}) 
    }
})

module.exports= {
    postRouter
}