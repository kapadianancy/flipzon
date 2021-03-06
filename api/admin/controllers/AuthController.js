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
    app.post("/admin/forgotPassword", async (req,res,next) => {
        try {
            if(!req.body.email) {
                let error = {
                    statusCode: 400,
                    message: "Email is required"
                }
                throw error;
            }
            const message = await AuthService.forgotPassword(req.body.email);
            res.send({ message })
        } catch(error) {
            next(error);
        }
    });
    app.get("/admin/checkLink", async (req,res,next) => {
        try {
            if(req.query.iv && req.query.data) {
                await AuthService.decryptLink({ iv: req.query.iv, encryptedData: req.query.data })
                res.send();
            } else {
                throw { statusCode: 400, message: "Link is not valid" };
            }
        } catch(error) {
            next(error);
        }
    });
    app.post("/admin/resetPassword", async (req,res,next) => {
        try {
            if(req.query.iv && req.query.data) {
                let email = await AuthService.decryptLink({ iv: req.query.iv, encryptedData: req.query.data });
                let result = await AuthService.resetPassword(email, req.body.password);
                res.send({ message: "Password updated!" });
            } else {
                throw { statusCode: 400, message: "Link is not valid" };
            }
        } catch(error) {
            next(error);
        }
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
    app.post("/admin/role", async (req,res,next) => {
        try {
            let role = await AuthService.addRole(req.body.name);
            res.send(role);
        } catch (error) {
            next(error);
        }
    })
}