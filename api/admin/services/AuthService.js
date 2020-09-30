const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {ValidationError} = require('sequelize');
const secret = "filezonToken";

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
        console.log(error);
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
        throw error
    }
}
module.exports = {
    login,
    register,
    update
}