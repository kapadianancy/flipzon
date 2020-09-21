const productService = require("../services/ProductService");

module.exports = (app) => {
    app.get("/products", async (req, res, next) => {
        let products = await productService.fetchProducts();
        res.send(products);
    })
    app.post("/products", async (req, res, next) => {
        try {
            let product = await productService.addProduct(req.body);
            res.send(product);
        } catch(error) {
            next(error);
        }
    })
    app.put("/products/:id", async (req, res, next) => {
        try {
            let product = await productService.editProduct(req.params.id, req.body);
            res.send(product);
        } catch (error) {
            next(error);
        }
    })
    app.delete("/products/:id", async (req, res, next) => {
        try {
            let product = await productService.deleteProduct(req.params.id);
            res.send(product);
        } catch (error) {
            next(error);
        }
    })
}
