const ordersServices = require('../services/OrderAdminService');
const auth = require("../middlewares/auth");
module.exports = (app) => {

  // return list of Orders
app.get("/admin/orders", auth,async (req, res, next) => {
    try{
        let orders = await ordersServices.getOrders(req.query.page, req.query.limit);
    
        res.send(orders);
    
    }catch(error)
    {
        next(error);      
    }
})

app.put("/admin/orders/:id/:status", auth, async (req, res, next) => {
    try {

        let orders = await ordersServices.editOrders(req.params.id,req.params.status);

        res.send(orders);

    } catch (error) {

        next(error);
    }
})

app.get("/admin/allorders/:id", async (req, res, next) => {
    try{
    
        let orders = await ordersServices.getAllOrders(req.params.id);
        
        res.send(orders);
    }catch(error)
    {
        next(error);      
    }

})
app.get("/admin/orderBill/:id", async (req, res, next) => {
    try{
        let orders = await ordersServices.getOrderBill(req.params.id);
    
        res.send(orders);
    
    }catch(error)
    {
        next(error);      
    }
})    
};