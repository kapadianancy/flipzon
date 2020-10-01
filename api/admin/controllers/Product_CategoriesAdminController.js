const Product_Categories_Services = require('../services/Product_CategoriesAdminServices');
var multer  = require('multer');
const auth = require("../middlewares/auth");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
});
const upload = multer({ storage: storage });

module.exports = (app) => {

  // return list of Product_Category
app.get("/admin/product_categories", auth, async (req, res, next) => {
    let product_categories = await Product_Categories_Services.getProduct_Category();
    res.send(product_categories);
    })
  // return single Product_Category
app.get("/admin/product_categories/:id", auth, async (req, res, next) => {
    let product_categories = await Product_Categories_Services.getSingleProduct_Category(req.params.id);
    res.send(product_categories);
    })
// add  Product_Category
app.post("/admin/product_categories", auth, upload.single('image'),async (req, res, next) => {
    if(req.file) {
        req.body = {
            ...req.body,
            image: "/"+req.file.destination+req.file.filename
        }
    }
    try {
        let product_categories = await Product_Categories_Services.addProduct_Category(req.body);
        console.log(product_categories);
        res.send(product_categories);
    } catch(error) {
        next(error);
    }
})
//Edit Product_Category
app.put("/admin/product_categories/:id", auth, upload.single('image'),async (req, res, next) => {
    if(req.file) {
        req.body = {
            ...req.body,
            image: "/"+req.file.destination+req.file.filename
        }
    }
    try {
        let product_categories = await Product_Categories_Services.editProduct_Category(req.params.id, req.body);
        res.send(product_categories);
    } catch (error) {
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