const AuthService = require("../services/AuthService");
const auth = require("../middlewares/auth");

module.exports = (app) => {
    app.post("/admin/login", async (req,res,next) => {
        try {
            const result = await AuthService.login(req.body.email, req.body.password);
            res.send(result);
        } catch (error) {
            next(error);
        }
    });
    app.get("/admin/me", auth, (req,res,next) => {
        res.send(req.user);
    });
    app.post("/admin/register", async (req,res,next) => {
        try {
            let user = await AuthService.register(req.body.username, req.body.email, req.body.password );
            res.send({ message: "Admin registered successfully!"});
        } catch (error) {
            next(error);
        }
    });
    app.post("/admin/updateProfile", auth, async (req,res,next) => {
        try {
            await AuthService.update(req.body, req.user.id);
            res.send({ message: "Profile updated successfully!" });
        } catch (error) {
            next(error);
        }
    })
}