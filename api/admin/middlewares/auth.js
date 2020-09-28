const secret = "filezonToken";
const jwt = require("jsonwebtoken");
const User = require("../../models/User")

const auth = async (req,res,next) => {
    try {
        const header= req.headers.authorization
        const errorObj = {
            statusCode: 401
        }
        if(!header){
            errorObj.message = "Authorization required!";
            throw errorObj;
        }
        const token = header.replace('Bearer ' ,'');
        const decode = jwt.verify(token, secret);
        const user = await User.findAll({
            where: {
                id: decode.id,
                isDeleted: false
            },
            attributes: ["id", "password", "username", "email", "contact", "address"]
        });
        if(!user) {
            errorObj.message = "Authorization required!";
            throw errorObj;
        }
        req.user = user[0];
        next();
    } catch(error) {
        let errorObj = { statusCode: 401 }
        if(error.name == "JsonWebTokenError") {
            errorObj.message = "Token Malformed";
            return next(errorObj);
        }
        next({ statusCode: 401, message: "Authorization required!" });
    }
}

module.exports = auth

