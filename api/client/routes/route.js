var express = require('express');
const { product } = require('../../models/main');
// const { route } = require('../app');
var router = express.Router();

const Authenticate=require("../services/Authenticate");
const Product=require("../services/Product");
const Order = require("../services/Order")
const auth = require('./auth');

//login
router.post('/client/login',Authenticate.login);

//signup
router.post('/client/signup',Authenticate.signup);

//logout
router.get('/client/logout',auth,Authenticate.logout);

//category
router.get('/client/category',Product.getAllCategory);

//category wise product
router.get('/client/category-product/:cid',Product.getCategoryProduct);

//product
router.get('/client/product',Product.getAllProduct);

//editProfile
router.put('/client/editProfile/:id',auth,Authenticate.editProfile);

//change Password
router.put('/client/changePassword/:id',auth,Authenticate.changePassword);

//forget Password
router.post('/client/fogetPassword',Authenticate.forgetPassword);

//placeOrder
//router.post("/placeOrder",auth,Order.placeOrder);
router.post("/client/checkOrder",auth,Order.checkOrder);

//addOrderItems
//router.post('/addOrderItems',auth,Order.addOrderItems);

//confirm order
router.put("/client/confirmOrder/:id",auth,Order.confirmOrder);

//cancel order
router.delete("/client/cancelOrder/:id",auth,Order.cancelOrder);

//cancel order item
router.delete("/client/cancelOrderItem/:id",auth,Order.cancelOrderItem);

//most ordered products
router.get("/client/orderedProducts/",Order.orderedProducts);

module.exports = router;