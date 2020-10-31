const Product_Categories_Services = require('../services/Product_CategoriesAdminServices');
// var uploader = require("../middlewares/categoryImage");
const auth = require("../middlewares/auth");
var path = require('path');
var Jimp = require('jimp');
const { Storage } = require('@google-cloud/storage');
var multer  = require('multer');
const upload = require('../middlewares/upload');

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
}).fields([{ name: 'image', maxCount: 1 }]);
module.exports = (app) => {

  // return list of Product_Category
app.get("/admin/product_categories", async (req, res, next) => {
    try {

        let product_categories = await Product_Categories_Services.getProduct_Category(req.query.page, req.query.limit);
        res.send(product_categories);
    }
    catch(error) {
        next(error);
    }
    })
app.get("/admin/categoriesSearch/:search",auth, async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.getProduct_CategorySearch(req.params.search);
        res.send(product_categories);
    }
    catch(error) {
        next(error);
    }
    })    
  // return single Product_Category
app.get("/admin/product_categories/:id", auth, async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.getSingleProduct_Category(req.params.id);
        res.send(product_categories);
    }
    catch(error) {
        next(error);
    }
    })
// return parent Product_Category 
app.get("/admin/product_categoriesParent/:id", async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.getProduct_CategoryParent(req.params.id);
        res.send(product_categories);
    }
    catch(error) {
        next(error);
    }
    })
// add  Product_Category
app.post("/admin/product_categories/:id", uploader,upload,async (req, res, next) => {
    console.log("Called")
    try {    
        req.body = {
            ...req.body,
            image:req.images.image[0],
            thumbnailImage:req.images.image[1]
        }    
        let product_categories =await Product_Categories_Services.addProduct_Category(req.params.id,req.body);
        res.send(product_categories);
    } catch(error) {
        next(error);
    }            
        // var myPath = path.join(__dirname, '..', '..', 'public', 'images');
        // var myPath1 = path.join(__dirname, '..', '..', 'public', 'thumbnails');
        // Jimp.read(myPath+"/"+req.files.image.filename)
        //     .then(lenna => {
        //         let thumbnailImage = lenna.resize(64, 64).quality(90).write(myPath1+"/"+req.files.image[0].filename);
        
        // return { thumbnailImage }
        // }).catch(err => {
        //     console.error(err);
        // });
})
//Edit Product_Category
app.put("/admin/product_categories/:id", auth,uploader,upload,async (req, res, next) => {
    try {    
        req.body = {
            ...req.body,
            image:req.images.image[0],
            thumbnailImage:req.images.image[1]
        }    
        let product_categories = await Product_Categories_Services.editProduct_Category(req.params.id, req.body);
        res.send(product_categories);
    } catch(error) {
        next(error);
    } 
})
app.put("/admin/categories/:id", async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.edit_DeleteProduct_Category(req.params.id);
        res.send(product_categories);
    } catch (error) {
        next(error);
    }
})
// Delete Product_Category
app.delete("/admin/product_categories/:id", auth, async (req, res, next) => {
    try {
        let product_categories = await Product_Categories_Services.deleteProduct_Category(req.params.id);
        res.send(product_categories);
    } catch (error) {
        next(error);
    }
})
};