const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const product = require("../../models/Product");
const productcategory = require("../../models/Product_category");
const sequelize = require("sequelize");

const getProdCount = async () => {
    try{
        let cp = await product.findAndCountAll({
        attributes: ['categoryId', [sequelize.fn('count', sequelize.col('categoryId')), 'count']],
        include:[{
            model:productcategory,as:"Product_category"
        }],group : ['categoryId'],where:{ IsDeleted:0 } })
        return await {cp};
    }catch(error) {
        throw error;
    } 
} 
const getCount = async () => {
    try{
        let totalProduct = await product.count({
            where:{ IsDeleted:0 } })
        let totalCategoies =await productcategory.count({
            where:{ IsDeleted:0 } })
        let totalOrder =await Orders.count({
            where:{  } })
        let totalCompletedOrder =await Orders.count({
            where:{ IsDeleted:0 , status:"Delivered" } })
        let totalConfirmdOrder =await Orders.count({
            where:{ IsDeleted:0 , status:"Confirm" } })
        let totalCanceledOrder =await Orders.count({
            where:{ status:"Canceled" } })
        let totalUser =await user.count({
            where:{ IsDeleted:0 , roleId:2 } })
        let totalRevenue =await Orders.findAll({
            attributes: ['totalPrice', [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPrice']],
            where:{ IsDeleted:0 , status:"Delivered" } })
            //findAndCountAll
                
            //SELECT category.name, COUNT(category_id) 
// FROM category LEFT JOIN product ON category.id = product.category_id
// GROUP BY id    
        let dataCnt = {
            totalProduct,
            totalCategoies,
            totalOrder,
            totalCompletedOrder,
            totalConfirmdOrder,
            totalCanceledOrder,
            totalUser,
            totalRevenue
        }      
        return await dataCnt;
    }catch(error) {
        throw error;
    }  
}
module.exports = {
    getCount,
    getProdCount
}