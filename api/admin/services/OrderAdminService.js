const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const product = require("../../models/Product");
const productcategory = require("../../models/Product_category");
const getAllOrders = async (id) => {
    try{
        return await OrdersDetails.findAll({
            include: [{
                model:product,as:"product",
                include:[{
                    model:productcategory,as:"Product_category"
                }]
            }],
            where:{
                IsDeleted:0,
                orderId:id
            }
        })
    }catch(error) {
        throw error;
    }  
}
const getOrders = async () => {
    try{
        return await Orders.findAll({
            include: [
                {
                    model: user ,as:"user"
                },
            ],
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
    editOrders,
    getAllOrders
}