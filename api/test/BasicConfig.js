const chai = require('chai');
const chatHttp = require("chai-http");
const app = require("../app");
let should = chai.should();
let db = require("../models/main");
chai.use(chatHttp);
let token = null;

before( async () => {
  await db.Role.create({ name: "admin", description: "" });
  await db.Role.create({ name: "user", description: "" });
  await chai.request(app).post("/admin/register")
        .send({ username: 'John Doe', email: 'john.doe@gmail.com', password: "john1234"});
  await chai.request(app).post("/admin/register")
    .send({ username: 'Admin', email: 'admin@gmail.com', password: "admin123"});
  console.log("before called to create basic roles and common admin user");
})
after( async () => {
  // await db.Order_details.destroy({ where: {} });
  // await db.Order.destroy({ where: {} });

  // await db.Product_image.destroy({ where: {} });
  // await db.product.destroy({ where: {} });
  // await db.Product_category.destroy({ where: {} });

  // await db.User.destroy({ where: {} });
  // await db.Role.destroy({ where: {} });
  console.log("after called to delete user and role");
})