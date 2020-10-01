const totalDataServices = require('../services/DashboardService');
const auth = require("../middlewares/auth");
module.exports = (app) => {

  // return list of Orders
app.get("/admin/dashboard", auth, async (req, res, next) => {
    try{
        let total = await totalDataServices.getCount();
        await res.send(total);
    }catch (error) {
        throw error;
    }  
    })

app.get("/admin/dashboardProduct", auth, async (req, res, next) => {
    try{
        let total = await totalDataServices.getProdCount();
        await res.send(total);
    }catch (error) {
        throw error;
    }  
    })
};