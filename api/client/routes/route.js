var express = require('express');
const { route } = require('../app');
var router = express.Router();

const Authenticate=require("../services/Authenticate");

//category
router.get('/category',)

//product
router.get('/product',)

//login
router.post('/login',Authenticate.login);

//signup
router.post('/signup',Authenticate.signup);

//logout
router.get('/logout',);

//editProfile
router.put('/editProfile/:id',);

//placeOrder
router.post("/placeOrder",);

//addOrderItems
router.post('/addOrderItems',);

//orderStatusUpdate
router.put("/orderStatus/:id",);

module.exports = router;
