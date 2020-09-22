var express = require('express');
const { route } = require('../app');
var router = express.Router();

//category
router.get('/category',(req,res)=>
{

});

//product
router.get('/product',(req,res)=>
{

})

//login
router.post('/login',(req,res)=>
{

});

//logout
router.get('/logout',(req,res)=>
{

});

//editProfile
router.put('/editProfile/:id',(req,res)=>{

});

//placeOrder
router.post("/placeOrder",(req,res)=>
{

});

//addOrderItems
router.post('/addOrderItems',(req,res)=>
{

});

//orderStatusUpdate
router.put("/orderStatus/:id",(req,res)=>
{

});

module.exports = router;
