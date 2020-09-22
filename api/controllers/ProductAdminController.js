const productService = require("../services/ProductAdminService");
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});
var upload = multer({ storage: storage });

module.exports = (app) => {
    app.get("/admin/products", async (req, res, next) => {
        let products = await productService.fetchProducts();
        res.send(products);
    })
    app.post("/admin/products", upload.single("image"), async (req, res, next) => {
        if(!req.file) {
            return next({
                statusCode: 400,
                message: "Product Image is required"
            })
        }
        req.body = {
            ...req.body,
            main_image: "/"+req.file.destination+req.file.filename
        }
        try {
            let product = await productService.addProduct(req.body);
            res.send(product);
        } catch(error) {
            next(error);
        }
    })
    app.put("/admin/products/:id", upload.single("image"), async (req, res, next) => {
        if(req.file) {
            req.body = {
                ...req.body,
                main_image: "/"+req.file.destination+req.file.filename
            }
        }
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
