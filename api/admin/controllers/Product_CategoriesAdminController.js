const Product_Categories_Services = require('../services/Product_CategoriesAdminServices');

module.exports = (app) => {

  // return list of Product_Category
app.get("/admin/product_categories", async (req, res, next) => {
    let product_categories = await Product_Categories_Services.getProduct_Category();
    res.send(product_categories);
    })
  // return single Product_Category
app.get("/admin/product_categories/:id", async (req, res, next) => {
    let product_categories = await Product_Categories_Services.getSingleProduct_Category(req.params.id);
    res.send(product_categories);
    })
// return a specific Product_Category
app.post("/admin/product_categories", async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.addProduct_Category(req.body);
        res.send(product_categories);
    } catch(error) {
        next(error);
    }
})
//Edit Product_Category
app.put("/admin/product_categories/:id", async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.editProduct_Category(req.params.id, req.body);
        res.send(product_categories);
    } catch (error) {
        next(error);
    }
})
// Delete Product_Category
app.delete("/admin/product_categories/:id", async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.deleteProduct_Category(req.params.id);
        res.send(product_categories);
    } catch (error) {
        next(error);
    }
})
};