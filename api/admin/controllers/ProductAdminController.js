const productService = require("../services/ProductAdminService");
var multer  = require('multer');
const auth = require("../middlewares/auth");
const validator = require("../utils/Validator");
const { validationResult } = require('express-validator');
const upload = require("../middlewares/upload");

var multer  = require('multer');
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
}).fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]);

module.exports = (app) => {
    // i/p: query [ page, limit ]
    app.get("/admin/products", async (req, res, next) => {
        let products = await productService.fetchProducts(req.query.page, req.query.limit);
        res.send(products);
    })
    
    // i/p: query [ text (required), strong (optional) ]
    // o/p: returns list of products [ id, name, main_image, stock, product_category { name } ]
    app.get("/admin/products/search", async (req,res,next) => {
        try {
            if(!req.query.text) {
                let errorObj = { statusCode: 400, message: "Invalid search text" };
                throw errorObj;
            }
            let strong = req.query.strong ? true : false;
            let wordsArr = req.query.text.toLowerCase().split(" ");
            let products = await productService.searchProducts(wordsArr, strong);
            res.send(products);
        } catch(error) {
            next(error);
        }
    });
    app.get("/admin/products/:id", auth, async (req, res, next) => {
        try {
            let products = await productService.fetchSingleProduct(req.params.id);
            res.send(products);
        } catch(error) {
            next(error);
        }
    })

    app.post("/admin/products", auth, uploader, upload, validator.createUser, async (req, res, next) => {
        const ctx = validationResult(req);
        if(ctx.errors.length > 0) {
            return next({ statusCode: 400, message: ctx });
        }
        if(req.body.specifications) {
            req.body.specifications = JSON.parse(req.body.specifications);
        }
        if(!req.images.image) {
            return next({
                statusCode: 400,
                message: "Product Image is required"
            })
        }
        
        req.body = {
            ...req.body,
            main_image: req.images.image[0],
            thumbnail: req.images.image[1]
        }
        try {
            // var images = req.files.images && req.files.images.length > 0 ? req.files.images : [];
            let product = await productService.addProduct(req.body, req.images.images);
            res.send(product);
        } catch(error) {
            next(error);
        }
    })
    
    app.put("/admin/products/:id", auth, validator.editUser, uploader, upload, async (req, res, next) => {
        const ctx = validationResult(req);
        if(ctx.errors.length > 0) {
            return next({ statusCode: 400, message: ctx });
        }
        
        if(req.body.specifications) {
            req.body.specifications = JSON.parse(req.body.specifications);
        }
        if(req.files.image) {
            req.body = {
                ...req.body,
                main_image: req.images.image[0],
                thumbnail: req.images.image[1]
            }
        }
        try {
            // var images = req.files.images && req.files.images.length > 0 ? req.files.images : [];
            let response = await productService.editProduct(req.params.id, req.body, req.images.images);
            res.send(response);
        } catch (error) {
            next(error);
        }
    })

    app.put("/admin/productOffer/:id/:discount/:offer", async (req, res, next) => {
        try {
            let response = await productService.editProductOffer(req.params.id,req.params.discount, req.params.offer);
            res.send(response);
        } catch (error) {
            next(error);
        }
    })

    // to delete product images
    app.post("/admin/products/images", auth, async (req, res, next) => {
        try {
            if(!req.body.ids || req.body.ids.length == 0) {
                throw { statusCode: 400, message: "Invalid arguments provided"}
            };
            let result = await productService.deleteProductImage(req.body.ids);
            res.send(result);
        } catch (error) {
            next(error);
        }
    })

    app.delete("/admin/products/:id", auth, async (req, res, next) => {
        try {
            let product = await productService.deleteProduct(req.params.id);
            res.send(product);
        } catch (error) {
            next(error);
        }
    })

    app.get("/admin/outOfStock", auth, async (req,res,next) => {
        try {
            let products = await productService.fetchOutOfStockProducts(req.query.limit, req.query.ascending);
            res.send(products);
        } catch (error) {
            next(error);
        }
    })
}