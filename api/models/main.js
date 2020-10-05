const db=require("../db/db");

const role=require("../models/Role");
const user=require("../models/User");
const Product_category=require("../models/Product_category");
const Product=require("../models/Product");
const Product_image=require("../models/Product_image");
const Order=require("../models/Order");
const Order_details=require("../models/Order_details");

let options = { alter: false };
if(process.env.environment === "TEST") {
    options = { force: true };
}
const sync = async () => {
    await db.sequelize.sync(options);
}
sync();

module.exports={
    User:user,
    product:Product,
    Product_category:Product_category,
    Order:Order,
    Order_details:Order_details,
    Product_image:Product_image
}
