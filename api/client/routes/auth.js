const main=require('../../models/main');
const jwt=require("jsonwebtoken");
const secret="flipzoneToken";

const auth=async(req,res,next)=>
{
    try{
<<<<<<< HEAD
        //console.log("auth running");
        const token=req.header("Authorization").replace("Bearer ","");
        //console.log(token);
        const valid=await jwt.verify(token,secret);
        //console.log("-----------"+valid._id);
        const u=await main.User.findByPk(valid._id);
        //console.log(u);
=======
        console.log("auth running");
        const token=req.header("Authorization").replace("Bearer ","");
        console.log(token);
        const valid=await jwt.verify(token,secret);
        //console.log("-----------"+valid._id);
        const u=await main.User.findByPk(valid._id);
        console.log(u);
>>>>>>> 6c76f9d58ae7c1c5cd8768e6e8a2982f553b4e13
        if(!u)
        {
            throw new Error();
        }
        req.validUser=u;
        req.token=token;
        next();
    } catch(e)
    {
        res.status(403).send("not authenticated");
    }
}

module.exports=auth;