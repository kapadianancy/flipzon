const Orders = require("../../models/Order");
const OrdersDetails = require("../../models/Order_details");
const user = require("../../models/User");
const product = require("../../models/Product");
const productcategory = require("../../models/Product_category");
const { sequelize } = require('../../db/db');

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
const getRevenueCount = async () => {
    try{
       var jan = await sequelize.query("Select sum(totalPrice) as jan from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='January'");
       var feb = await sequelize.query("Select sum(totalPrice) as feb from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='February'");
       var march = await sequelize.query("Select sum(totalPrice) as march from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='March'");
       var april = await sequelize.query("Select sum(totalPrice) as april from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='April'");
       var may = await sequelize.query("Select sum(totalPrice) as may from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='May'");
       var june = await sequelize.query("Select sum(totalPrice) as june from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='June'");
       var july = await sequelize.query("Select sum(totalPrice) as july from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='July'");
       var aug = await sequelize.query("Select sum(totalPrice) as aug from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='August'");
       var sep = await sequelize.query("Select sum(totalPrice) as sep from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='September'");
       var oct = await sequelize.query("Select sum(totalPrice) as oct from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='October'");
       var nov = await sequelize.query("Select sum(totalPrice) as nov from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='November'");
       var dec = await sequelize.query("Select sum(totalPrice) as dece from orders where IsDeleted=0 and status='Delivered' and monthname(orderDate)='December'");
       
    //    let cp= 
        return await {
            jan, feb, march, april, may,june,
            july, aug, sep, oct, nov, dec
           };
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
            totalRevenue,
            getRevenueCount
        }      
        return await dataCnt;
    }catch(error) {
        throw error;
    }  
}
module.exports = {
    getCount,
    getProdCount,
    getRevenueCount
}