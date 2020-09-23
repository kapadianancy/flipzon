var express = require('express');
const { product } = require('../../models/main');
const { route } = require('../app');
var router = express.Router();

const Authenticate=require("../services/Authenticate");
const Product=require("../services/Product");
const Order = require("../services/Order")
const auth = require('./auth');

//login
router.post('/login',Authenticate.login);

//signup
router.post('/signup',Authenticate.signup);

//logout
router.get('/logout',auth,Authenticate.logout);

//category
router.get('/category',Product.getAllCategory);

//product
router.get('/product',Product.getAllProduct);

//editProfile
router.put('/editProfile/:id',auth,Authenticate.editProfile);

//change Password
router.put('/changePassword/:id',auth,Authenticate.changePassword);

//forget Password
router.post('/fogetPassword',Authenticate.forgetPassword);

//placeOrder
//router.post("/placeOrder",auth,Order.placeOrder);
router.post("/checkOrder",auth,Order.checkOrder);

//addOrderItems
//router.post('/addOrderItems',auth,Order.addOrderItems);

//confirm order
router.put("/confirmOrder/:id",auth,Order.confirmOrder);

//cancel order
router.delete("/cancelOrder/:id",auth,Order.cancelOrder);

//cancel order item
router.delete("/cancelOrderItem/:id",auth,Order.cancelOrderItem);

module.exports = router;
