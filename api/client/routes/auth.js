const main=require('../../models/main');
const jwt=require("jsonwebtoken");
const secret="flipzoneToken";

const auth=async(req,res,next)=>
{
    try{
        console.log("auth running");
        const token=req.header("Authorization").replace("Bearer ","");
        console.log(token);
        const valid=await jwt.verify(token,secret);
        //console.log("-----------"+valid._id);
        const u=await main.User.findByPk(valid._id);
        console.log(u);
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