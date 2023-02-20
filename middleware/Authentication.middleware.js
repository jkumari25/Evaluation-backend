const jwt= require("jsonwebtoken");

const authenticate= (req,res,next)=>{
    const token= req.headers.authorization
    if(token){
        const decoded= jwt.verify(token,"jagriti")
        if(decoded){
            const userId= decoded.userId;
            console.log(decoded);
            req.body.userId=userId;
            next();
        }
    }
    else{
        res.send({"msg":"Please Login first"});
    }
}

module.exports={
    authenticate
}