const DataTypes = require("sequelize");
const db=require("../db/db");
const User=require("./User");

const Order =db.sequelize.define("Order", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{
            type:DataTypes.INTEGER,
        },
        orderDate:
        {
            type:DataTypes.DATE,
            allowNull:false
        },
        totalPrice:
        {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        status:
        {
            type:DataTypes.STRING,
            allowNull:false
        }
});

//relationship
Order.belongsTo(User,{
    foreignKey:"userId",
    onDelete:"cascade",
    as:"user"
});

module.exports = Order;