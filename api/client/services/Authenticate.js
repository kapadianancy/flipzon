const main=require('../../models/main');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const secret="flipzoneToken";


exports.signup=async function(req,res)
{
    const user=req.body;
    const pass=await hash(user.password);
    const u=await main.User.create({
        username:user.username,
        email:user.email,
        password:pass,
        contact:user.contact,
        address:user.address,
        roleId:2
    });
    const token=await generateToken(u.id);
    res.status(201).send({"token":token});
    
}

exports.login=async(req,res)=>
{
   
        const user=req.body;
        const u=await main.User.findAll({
            where:
            {
                username:user.username
            }
        });
        
        if(u.length==0)
        {
            return res.status(404).send("invalid username");
        }
        //return res.send(u[0].password);
        bcrypt.compare(user.password,u[0].password)
        .then(async(data)=>
            {
                const token=await generateToken(u.id);        
               return res.status(200).send({user:u,token:token});
            })
        .catch(err=>
            {
                return res.status(401).send("not valid");
            });
        

}

const generateToken=async function(id)
{
    const token=await jwt.sign({_id:id},secret);
    return token;
}

const hash=async function(password)
{
    const h=await bcrypt.hash(password,8);
    return h;
}
