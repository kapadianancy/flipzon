const main=require('../../models/main');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

var nodemailer = require('nodemailer');

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
                username:user.username,
                isDeleted : 0
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

exports.editProfile= async(req,res) =>
{
    try{
        // const user = await main.User.findByPk(req.validUser.id);

        // if(!user)
        // {
        //     return res.status(401).send("User Not Found");
        // }
        const User = await main.User.update(req.body, {
            where: {
                id: req.validUser.id,
                isDeleted : 0
            }
        });
        
        if(User)
        {
            return res.status(200).send("Successfully Updated");
        }
        else
        {
            return res.status(400).send("Not Updated");
        }
     
    }
    catch(error)
    {
         res.status(400).send(error);
    }
}

exports.changePassword =async(req,res) =>{
    try{
        // const user = await main.User.findByPk(req.validUser.id);

        // if(!user)
        // {
        //     return res.status(401).send("User Not Found");
        // }

        let validpass=await bcrypt.compare(req.body.oldpass,req.validUser.password)

        if(!validpass)
        {
            return res.status(400).send("Not Valid Old Password");
        }

        const password=await gethash(req.body.newpass);
        const User = await main.User.update( {
            "password" : password
        } , {
            where: {
                id: req.validUser.id,
                isDeleted : 0
            }
        });
        
        if(User)
        {
            return res.status(201).send("Successfully Password Changed");
        }
        else
        {
            return res.status(400).send("Not Updated");
        }
     
    }
    catch(error)
    {
         res.status(400).send(error);
    }
}

exports.forgetPassword = async (req,res) => {
    try{
        const email=req.body.email;
        const user =  await main.User.findOne(
            { 
                where: 
                { 
                    "email": email,
                    isDeleted : 0
                } 
            });

        if(!user)
        {
            return res.status(401).send("User Not Found");
        }

        const result=await sendMail(email);
        if(result)
        {
           
           return res.status(200).send("Check Your Mail For New Password");
           
        }
        else
        {
            return res.status(400).send(result);
        }
    }
    catch(error)
    {
        res.status(400).send(error);
    }
}

const sendMail = async function(email){
    let status="";
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nidhinancy0921@gmail.com',
          pass: 'nidhi0921nancy'
        }
      });
      
      var randomstring     = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 5; i++ ) {
        randomstring += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      const password=await gethash(randomstring);
      const User = await main.User.update( {
        "password" : password
        } , {
            where: {
                email : email
            }
        });

      var mailOptions = {
        from: 'nidhinancy0921@gmail.com',
        to: email,
        subject: 'Forget Password From Flipzon',
        text: 'New Password : '+randomstring
      };
      
        let sendmail=await transporter.sendMail(mailOptions);

        return sendmail;

   
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
