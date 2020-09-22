const productService = require("../services/ProductAdminService");

module.exports = (app) => {
    app.get("/admin/products", async (req, res, next) => {
        let products = await productService.fetchProducts();
        res.send(products);
    })
    app.post("/admin/products", async (req, res, next) => {
        try {
            let product = await productService.addProduct(req.body);
            res.send(product);
        } catch(error) {
            next(error);
        }
    })
    app.put("/admin/products/:id", async (req, res, next) => {
        try {
            let product = await productService.editProduct(req.params.id, req.body);
            res.send(product);
        } catch (error) {
            next(error);
        }
    })
    app.delete("/admin/products/:id", async (req, res, next) => {
        try {
            let product = await productService.deleteProduct(req.params.id);
            res.send(product);
        } catch (error) {
            next(error);
        }
    })
}
