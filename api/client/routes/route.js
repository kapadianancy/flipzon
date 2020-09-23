var express = require('express');
const { product } = require('../../models/main');
const { route } = require('../app');
var router = express.Router();

const Authenticate=require("../services/Authenticate");
const Product=require("../services/Product");
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

// //editProfile
// router.put('/editProfile/:id',()=>{});

// //placeOrder
// router.post("/placeOrder",()=>{});

// //addOrderItems
// router.post('/addOrderItems',()=>{});

// //orderStatusUpdate
// router.put("/orderStatus/:id",()=>{});

module.exports = router;
