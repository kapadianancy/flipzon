const User = require("../../models/User")
const Order = require("../../models/Order")

const getUsers = async (limit, page, type) => {
    let options = {
        where: {
            isDeleted: false
        },
        attributes: ["id", "username", "email", "contact", "address", "roleId"]
    }
    let totalOptions = { isDeleted: false };
    if(type) {
        totalOptions.roleId = type
        options.where.roleId = type;
    }
    if(page && limit) {
        options.offset = 0 + (page-1) * limit;
        options.limit = +limit;
    }
    try {
        let total = await User.count({ where: totalOptions})
        if(limit) {
            total = Math.ceil(total / +limit);
        }
        let users = await User.findAll(options);
        return { total, users }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserOrders = async (id) => {
    try {
        let orders = await Order.findAll({
            where: {
                userId: id,
                isDeleted: false
            },
            attributes: [ "id", "orderDate", "totalPrice", "status" ]
        });
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var user = await User.findOne({
            where: {
                id,
                isDeleted: false
            },
        });
        if(!user) {
            errorObj.statusCode = 404
            errorObj.message = "User not found";
        }
        if(errorObj.message) throw errorObj
        // const exist = fs.existsSync("./.."+product.main_image);
        // console.log(exist);
        await User.update({
            "isDeleted": true
        }, {
            where: { id }
        });
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserOrders,
    deleteUser
}