const main=require('../../models/main');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const secret="flipzoneToken";


exports.signup=async function(req,res)
{
    try{
        const user=req.body;
        const pass=await gethash(user.password);
        const u=await main.User.create({
            username:user.username,
            email:user.email,
            password:pass,
            contact:user.contact,
            address:user.address,
            roleId:2
        });
        const token=await generateToken(u.id);
        res.status(201).send({"token":token,"user":u});
    }
    catch(err)
    {
        return res.status(400).send({"err":err});
    }
    
    
}

exports.login=async(req,res)=>
{
    try{
        const user=req.body;
        const u=await main.User.findAll({
            where:
            {
                username:user.username
            }
        });
        
        if(u.length==0)
        {
            return res.status(401).send("invalid username");
        }
        //return res.send(u[0].password);
        let valid=await bcrypt.compare(user.password,u[0].password);
        if(!valid)
        {
            return res.send(401).send("invalid pasword");
        }
        const token=await generateToken(u[0].id);
        res.status(200).send({"user":u,"token":token});
    }
    catch(e){
        res.status(400).send(e);
    }
     
}

exports.logout=async(req,res)=>
{
    res.send("logged out");
}

const generateToken=async function(id)
{
    const token=await jwt.sign({_id:id},secret);
    return token;
}

const gethash=async function(password)
{
    const h=await bcrypt.hash(password,8);
    return h;
}
