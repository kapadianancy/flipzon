const DataTypes = require("sequelize");
const db=require("../db/db");
const Order=require("./Order");
const Product=require("./Product");

const Order_details =db.sequelize.define("Order_detail", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        orderId:{
            type:DataTypes.INTEGER,
        },
        productId:{
            type:DataTypes.INTEGER,
        },
        quantity:
        {
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:1
        },
        price:
        {
            type:DataTypes.INTEGER,
            allowNull:false
        }
});

//relationship
Order_details.belongsTo(Order,{
    foreignKey:"orderId",
    onDelete:"cascade",
    as:"order"
});

Order_details.belongsTo(Product,{
    foreignKey:"productId",
    onDelete:"cascade",
    as:"product"
})
module.exports = Order_details;