const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/User.route');
const {postRouter}= require("./routes/Post.route");
const { authenticate } = require('./middleware/Authentication.middleware');
require("dotenv").config();

const app= express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Home Page");
})

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts",postRouter);


app.listen(process.env.port, async()=>{
  try {
    await connection;
    console.log("Connected to DB");
  } 
  catch (error) {
    console.log("Cannot connected to DB")
  }
  console.log(`Server listening on ${process.env.port}`);
})