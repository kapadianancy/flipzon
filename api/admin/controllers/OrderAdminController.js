const ordersServices = require('../services/OrderAdminService');
const auth = require("../middlewares/auth");
module.exports = (app) => {

  // return list of Orders
app.get("/admin/orders", auth,async (req, res, next) => {
    let orders = await ordersServices.getOrders();
    res.send(orders);
    })
app.get("/admin/allorders/:id",  async (req, res, next) => {
    let orders = await ordersServices.getAllOrders(req.params.id);
    res.send(orders);
    })    
app.put("/admin/orders/:id", auth, async (req, res, next) => {
    try {
        let orders = await ordersServices.editOrders(req.params.id);
        res.send(orders);
    } catch (error) {
        next(error);
    }
})
};