const ReviewService = require("../services/ReviewServiece");
const auth = require("../middlewares/auth");

module.exports = (app) => {
    app.get("/admin/review", async (req,res,next) => {
        try {
            const result = await ReviewService.getReview(req.query.page, req.query.limit);
            res.send(result);
        } catch (error) {
            next(error);
        }
    });
    app.put("/admin/review/:id", async (req,res,next) => {
        try {
            await ReviewService.deleteReview(req.params.id);
            res.send({ message: "Review Deleted Successfully "});
        } catch (error) {
            next(error);
        }
    });
}