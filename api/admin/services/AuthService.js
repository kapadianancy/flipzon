const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {ValidationError} = require('sequelize');
const secret = "filezonToken";
const Role = require("../../models/Role");
const { encrypt, decrypt } = require("../utils/cryptic");
const { sendMail, createForgotPasswordHtml } = require("../utils/Mail");

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
const registerNew = async (req,res,next) => {
    try {
        let { username, email, password } = req.body;

        password = bcrypt.hashSync(password, 10);
        const user = await User.build({
            username, email, password,
            contact: "",
            address: "",
            roleId: 1
        });
        await user.validate();
        await user.save();
        res.send(user);
    } catch (error) {
        error = {
            statusCode: 400,
            message: "Invalid Arguments Provided"
        }
        if(error instanceof ValidationError) {
            error = {
                statusCode: 422,
                message: error.errors[0].message
            }
        }
        next(error)
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
        let encryptedEmail = encrypt(email);
        console.log(encryptedEmail);
        // let decrypted = decrypt(encryptedEmail);
        // console.log(decrypted);
        let link = `http://localhost:3000/admin/resetPassword?iv=${encryptedEmail.iv}&data=${encryptedEmail.encryptedData}`;
        let html = createForgotPasswordHtml(link);
        let data = sendMail(email, "Flipzon reset password", html, true);
        console.log(data);
        if(data.error) {
            throw { statusCode: 400, message: "Something went wrong while sending email" }
        }
        return data.message;
        // user = user[0].dataValues;
        // let password = Math.random().toString(36).slice(2);
        // let hashPassword = bcrypt.hashSync(password, 10);
        // await User.update({
        //     password: hashPassword
        // }, {
        //     where: { email }
        // });
        // return `Password is ${password}`
        // sendMail(email, user.username, password);
    } catch (error) {
        throw error;
    }
}
const addRole = async (roleName) => {
    try {
        var role = await Role.create({
            name: roleName,
            description: ""
        });
        role = role.get({ row: true })
        return role
    } catch(error) {
        throw error;
    }
}
const decryptLink = async (obj) => {
    try {
        const text = await decrypt(obj);
        return text
    } catch (error) {
        throw { statusCode: 400, message: "Not valid" }
    }
}
const resetPassword = async (email, password) => {
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
        // user = user[0].dataValues;
        let hashPassword = bcrypt.hashSync(password, 10);
        let res = await User.update({
            password: hashPassword
        }, {
            where: { email }
        });
        return res;
    } catch(error) {
        throw error;
    }

}
module.exports = {
    login,
    register,
    registerNew,
    update,
    forgotPassword,
    addRole,
    decryptLink,
    resetPassword
}