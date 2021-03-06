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

router.get('/client/subcategory',Product.getAllSubCategory);

//category wise product
router.get('/client/category-product/:cid',Product.getCategoryProduct);

//product
router.get('/client/product',Product.getAllProduct);

//getProductById
router.get('/client/getProductById/:pid',Product.getProductById);

//getSpecificationByProductId
router.get('/client/getSpecificationByProductId/:pid',Product.getSpecificationByProductId);

//getUserById
router.get('/client/getUserById',auth,Authenticate.getUserById);

//editProfile
router.put('/client/editProfile',auth,Authenticate.editProfile);

//change Password
router.put('/client/changePassword',auth,Authenticate.changePassword);

//change Password
router.get('/client/sendOTP',auth,Order.sendOTP);

//forget Password
router.post('/client/forgetPassword',Authenticate.forgetPassword);

//update Password
router.post('/client/updatePassword',Authenticate.updatePassword);

//placeOrder
//router.post("/placeOrder",auth,Order.placeOrder);
router.post("/client/checkOrder",Order.checkOrder);

//addOrderItems
//router.post('/addOrderItems',auth,Order.addOrderItems);

//confirm order
router.put("/client/confirmOrder/:id",auth,Order.confirmOrder);

//cancel order
router.delete("/client/cancelOrder/:id",auth,Order.cancelOrder);

//cancel order item
router.delete("/client/cancelOrderItem/:id",Order.cancelOrderItem);

//update order quantity
router.put("/client/updateOrder/",Order.updateOrder);

//most ordered products
router.get("/client/orderedProducts/",Order.orderedProducts);

//ViewOrder
router.get("/client/viewOrder",auth,Order.viewOrder);

//ViewOrderCart
router.get("/client/viewOrderCart/:uid",Order.viewOrderCart);

router.get("/client/viewOrderDetails/:oid",auth,Order.viewOrderDetails);

router.get("/client/searchProduct/:pro",Product.searchProducts);

//Add Review
router.post("/client/addReview",auth,Product.addReviews)

router.put("/client/updateUserId/:uid",auth,Order.updateUserId);

//Offers
router.get('/client/offer-product',Product.getOfferProduct);

router.get('/client/reviews/:pid',Product.reviews);

router.get('/client/categoryMenu/:cid',Product.categoryMenu)


module.exports = router;