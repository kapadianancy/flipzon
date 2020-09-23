const db=require("../db/db");

const role=require("./Role");
const user=require("./User");
const Product_category=require("./Product_category");
const Product=require("./Product");
const Product_image=require("./Product_image");
const Order=require("./Order");
const Order_details=require("./Order_details");


db.sequelize.sync({ alter: true }).then(() => {
    console.log("DB Droped, Resync and roles created.");
});

module.exports={
    User:user,
    product:Product,
    Product_category:Product_category,
    Order:Order,
    Order_details:Order_details
}
