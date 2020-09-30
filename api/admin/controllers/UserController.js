const UserService = require("../services/UserService");
const auth = require("../middlewares/auth");

module.exports = (app) => {
    app.get("/admin/users", auth, async (req,res,next) => {
        try {
            const result = await UserService.getUsers();
            res.send(result);
        } catch (error) {
            next(error);
        }
    });
    app.get("/admin/userOrders/:id", auth, async (req,res,next) => {
        try {
            let orders = await UserService.getUserOrders(req.params.id);
            res.send(orders);
        } catch (error) {
            next(error);
        }
    });
    app.delete("/admin/users/:id", auth, async (req,res,next) => {
        try {
            await UserService.deleteUser(req.params.id);
            res.send({ message: "User Deleted Successfully "});
        } catch (error) {
            next(error);
        }
    });
}