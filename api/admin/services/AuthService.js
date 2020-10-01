const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {ValidationError} = require('sequelize');
const secret = "filezonToken";
var nodemailer = require('nodemailer');

const login = async (email, password) => {
    try {
        const errorObj = {
            statusCode: 401
        }
        let user = await User.findAll({
            where: {
                email,
                roleId: 1,
                isDeleted: false
            },
            attributes: ["id", "password", "username", "email", "contact", "address"]
        });  
        if(user.length === 0) {
            user.message = "Unable to login!";
            throw errorObj;
        }
        user = user[0].dataValues
        const isValid = bcrypt.compareSync(password, user.password);
        if(!isValid) {
            user.message = "Unable to login!";
            throw errorObj;
        }
        let token = jwt.sign({ id: user.id }, secret);
        delete user.password;
        return {
            token: "Bearer "+token,
            user
        }
    } catch (error) {
        throw error
    }
}
const register = async (username, email, password) => {
    try {
        password = bcrypt.hashSync(password, 10);
        const user = await User.build({
            username, email, password,
            contact: "",
            address: "",
            roleId: 1
        });
        await user.validate();
        await user.save();
        return user;
    } catch (error) {
        if(error instanceof ValidationError) {
            error = {
                statusCode: 422,
                message: error.errors[0].message
            }
        }
        throw error
    }
}
const update = async (data, id) => {
    try {
        if(data.password) {
            data.password = bcrypt.hashSync(data.password, 10);
        }
        await User.update(data, {
            where: { id }
        });
    } catch(error) {
        if(error instanceof ValidationError) {
            error = {
                statusCode: 422,
                message: error.errors[0].message
            }
        }
        throw error
    }
}
const forgotPassword = async (email) => {
    try {
        const errorObj = {
            statusCode: 422
        }
        let user = await User.findAll({
            where: {
                email,
                roleId: 1,
                isDeleted: false
            },
            attributes: ["username"]
        }); 
        if(user.length === 0) {
            errorObj.message = "Email is not registered!";
            throw errorObj;
        };
        user = user[0].dataValues;
        let password = Math.random().toString(36).slice(2);
        let hashPassword = bcrypt.hashSync(password, 10);
        await User.update({
            password: hashPassword
        }, {
            where: { email }
        });
        return `Password is ${password}`
        // sendMail(email, user.username, password);
    } catch (error) {
        throw error;
    }
}
const sendMail = (toEmail, toName, password) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bhavikchavda61872@gmail.com',
            pass: 'bhavik61872'
        }
    });
    var html1 = "<br/>";
    html1 +="==============================";
    html1 +="</br>"
    var html="<html><body><table><tr><td class=\"Bu bAn\"><div class=\"\"><div id=\":2l\" class=\"ii gt\"><div id=\":2k\" class=\"a3s aXjCH msg5592298769751509350\">"+
    "<div><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.1&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ-4mlEvjpjqbuuXPsTEWERcyBGn9jbJbcW4saWDQbKooSB7BKn1QLonoaBqOxomuUBQekwqRrqKSjxAgygHjPFMsjYiDDeSzHP0oKUwMY3_3564zIShbLPgQj8&amp;disp=emb\" alt=\"dp- flipzone\" data-image-whitelisted=\"\" class=\"CToWUd\" width=\"100px\" height=\"30px\">\n" +
    "			<p>Dear "+ toName +" ,</p>\n" +
    "			<p>Your new password is <b>"+ password +"</b>, please try to login with this password.</p>\n" +
    "					\n" +
    "					<p>Please contact us via email <a href=\"mailto:dp297609@website.com\" target=\"_blank\">dp297609@website.com</a> or phone  (007) 123 456 7890.</p>\n" +
    "					<p>Connect with us on social media: \n" +
    "				<a href=\"https://www.facebook.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.facebook.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNGI49Hpn5uDYTvqIof-bOwo6sz_Bg\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.2&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ-xJ0RQ_O5HKXKagaohsDTVz_XGa3Yvq5IVGVejyFm0cq6xaEhJoH5Msml2Ecb0aab4u7VmgkVCDf5RDbony_UKUA1yBDaPn0uie_JtpSVyseFEjGvzx5Xzvl0&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>&nbsp;&nbsp;\n" +
    "				<a href=\"https://www.instagram.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.instagram.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNEs6YOqHxeSA1j6gFtWk9HVFCHDeg\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.3&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ8ieOtP5p4TcZn1vVnyq-Km5Qn75hqwR5kUzXqEjKScvBCCSR7FGLmbRHYpkX5d0lzBBpJRa8PvKsJHG8MS2jrZSzsl4gWNKs-WHsbPqWOqn_dvulAuQcPjGNg&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>&nbsp;&nbsp; \n" +
    "				<a href=\"https://www.youtube.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://www.youtube.com&amp;source=gmail&amp;ust=1597124127911000&amp;usg=AFQjCNGPhRLjAf1VMtb7iSJ12An1YHU0pw\"><img src=\"https://mail.google.com/mail/u/0?ui=2&amp;ik=b974c79857&amp;attid=0.1.4&amp;permmsgid=msg-f:1635663097844123044&amp;th=16b30aebdf36c5a4&amp;view=fimg&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ9GFLgljJILEzv3FJ0rLeuX7JKlIf9CTqKNiVnPRMIyTePmOOBOic9eyxzixT06bLRUPEZUtweSZ3yNV0o7tCfMWbVyDmhEDpLIQ33IecHG_f1Nuvl_NIspgT8&amp;disp=emb\" class=\"m_5592298769751509350imgclass CToWUd\" style=\"vertical-align:bottom;height:20px;width:20px\" data-image-whitelisted=\"\" width=\"20px\" height=\"20px\"></a>\n" +
    "				</p>\n" +
    "					<p>With regards,</p>\n" +
    "					<p style=\"margin:0px\">Founder&amp; CEO</p>\n" +
    "					<p style=\"margin:0px\">Flipzon</p>\n" +
    "					<p style=\"margin:0px\">LaNet Pvt Ltd</p>\n" +
    "					<p style=\"margin:0px\">Email: <a href=\"mailto:dp297609@gmail.com\" target=\"_blank\">dp297609@gmail.com</a></p>\n" +
    "					<p style=\"margin:0px\">Web: <a href=\"mailto:flipzon@website.com\" target=\"_blank\">dp297609@website.com</a></p>\n" +
    "					<p style=\"margin:0px\">Add:    405/406 Luxuria Business Hub,</p>\n" +
    "					<p style=\"margin:0px\"> Near VR mall, Surat - Dumas Rd, </p>\n" +
    "					<p style=\"margin:0px\">Surat, Gujarat 395007</p><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
    "				</div></div>"
    + "</div>"
    + "</div></div></div></div><div class=\"gA gt acV\"><div class=\"gB xu\"><table id=\":2u\" role=\"presentation\" class=\"cf gz ac0\" cellpadding=\"0\"><tbody><tr></tr></table></body></html>";
    var mailOptions = {
        from: 'bhavikvchavda@gmail.com',
        to: "bhavik.chvda@gmail.com",
        subject: 'Change Password',
        html:html
    };       
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("email sent");
        }
    });
}
module.exports = {
    login,
    register,
    update,
    forgotPassword
}