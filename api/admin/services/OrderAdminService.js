const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const getOrders = async () => {
    try{
        return await Orders.findAll({
            include: [{
                model: user ,as:"user"
               }],
            where: {
                IsDeleted:0
            }
        })
    }catch(error) {
        throw error;
    }  
}
const editOrders = async (id) => {
    try {
        let errorObj = { 
            statusCode:200 
        }
        let orders = await Orders.findByPk(id);
        if(!orders) {
            errorObj.statusCode = 404
            errorObj.message = "Orders not found";
        }
        if(errorObj.message) throw errorObj
        orders = await Orders.update({status:"Completed Delivery"}, {
            where: { id : id }
        });
        return await Orders.findByPk(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrders,
    editOrders
}