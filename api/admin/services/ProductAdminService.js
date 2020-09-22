const fs = require("fs");
const Product = require("../../models/Product");
const ProductImages = require("../../models/Product_image");

const fetchProducts = async () => {
    return await Product.findAll()
}
const addProduct = async (data, images) => {
    try {
        let errorObj = {
            statusCode: 400
        }
        if(!data.name) {
            errorObj.message = "Name is required";
        }
        if(!data.main_image) {
            errorObj.message = "Product main image is required";
        }
        if(!data.stock) {
            errorObj.message = "Product stock is required";
        }
        if(!data.categoryId) {
            errorObj.message = "Product Category is required";
        }
        if(!data.price) {
            errorObj.message = "Product Price is required";
        }
        if(errorObj.message) throw errorObj;
        var product = await Product.create({
            name: data.name,
            main_image: data.main_image,
            stock: data.stock,
            price: data.price,
            categoryId: data.categoryId
        });
        product = product.get({ row: true })
        if(images.length > 0) {
            let imageData = images.map( image => ({ image: "/"+image.destination+image.filename, productId: product.id }) );
            images = await ProductImages.bulkCreate(imageData);
            images = images.map( el => el.get({row: true}));
            product = {
                ...product,
                images
            }
        } else product.images = []
        return product;
    } catch(error) {
        throw error;
    }
}
const editProduct = async (id, data) => {
    try {
        let errorObj = { statusCode:400 }
        var product = await Product.findByPk(id);
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj
        product = await Product.update(data, {
            where: { id }
        });
        return await Product.findByPk(id);
    } catch (error) {
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var product = await Product.findByPk(id);
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj
        // const exist = fs.existsSync("./.."+product.main_image);
        // console.log(exist);
        await Product.destroy({
            where: { id }
        });
        return product;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct
}