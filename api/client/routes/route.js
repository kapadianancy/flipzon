var express = require('express');
const { product } = require('../../models/main');
const { route } = require('../app');
var router = express.Router();

const Authenticate=require("../services/Authenticate");
const Product=require("../services/Product");
<<<<<<< HEAD
const Order=require("../services/Order");
=======
>>>>>>> 6c76f9d58ae7c1c5cd8768e6e8a2982f553b4e13
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
router.post("/placeOrder",auth,Order.placeOrder);

//addOrderItems
router.post('/addOrderItems',auth,Order.addOrderItems);

//orderUpdate
router.put("/orderUpdate/:id",auth,Order.orderUpdate);

module.exports = router;
