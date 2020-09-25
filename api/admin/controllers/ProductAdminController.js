const productService = require("../services/ProductAdminService");
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }])

module.exports = (app) => {
    app.get("/admin/products", async (req, res, next) => {
        let products = await productService.fetchProducts(req.query.page, req.query.limit);
        res.send(products);
    })
    app.get("/admin/products/:id", async (req, res, next) => {
        try {
            let products = await productService.fetchSingleProduct(req.params.id);
            res.send(products);
        } catch(error) {
            next(error);
        }
    })
    
    app.post("/admin/products", cpUpload, async (req, res, next) => {
        if(!req.files.image) {
            return next({
                statusCode: 400,
                message: "Product Image is required"
            })
        }
        req.body = {
            ...req.body,
            main_image: "/images/"+req.files.image[0].filename,
        }
        // main_image: "/"+req.files.image[0].destination+req.files.image[0].filename,
        try {
            var images = req.files.images && req.files.images.length > 0 ? req.files.images : [];
            let product = await productService.addProduct(req.body, images);
            res.send(product);
        } catch(error) {
            next(error);
        }
    })
    
    app.put("/admin/products/:id", cpUpload, async (req, res, next) => {
        if(req.files.image) {
            req.body = {
                ...req.body,
                main_image: "/images/"+req.files.image[0].filename
            }
        }
        try {
            var images = req.files.images && req.files.images.length > 0 ? req.files.images : [];
            let response = await productService.editProduct(req.params.id, req.body, images);
            res.send(response);
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

    app.delete("/admin/products/images/:id", async (req, res, next) => {
        try {
            let result = await productService.deleteProductImage(req.params.id);
            res.send(result);
        } catch (error) {
            next(error);
        }
    })
}
