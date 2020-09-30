const User = require("../../models/User")
const Order = require("../../models/Order")

const getUsers = async () => {
    try {
        let users = await User.findAll({
            where: {
                isDeleted: false,
                roleId: 2
            },
            attributes: ["id", "username", "email", "contact", "address"]
        });
        return users;
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