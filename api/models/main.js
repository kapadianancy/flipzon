const db=require("../db/db");

const role=require("../models/Role");
const user=require("../models/User");
const Product_category=require("../models/Product_category");
const Product=require("../models/Product");
const Product_image=require("../models/Product_image");
const Order=require("../models/Order");
const Order_details=require("../models/Order_details");


db.sequelize.sync({ alter: true }).then(() => {
    console.log("DB Droped, Resync and roles created.");
});

