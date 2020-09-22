const db = require("../db/db");
const fs = require("fs");

const fetchProducts = async () => {
    return await db.products.findAll()
}
const addProduct = async (data) => {
    try {
        let errorObj = {
            statusCode: 400
        }
        if(!data.name) {
            errorObj.message = "Name is required";
        }
        if(!data.main_image) {
            errorObj.message = "Product image is required";
        }
        if(!data.stock) {
            errorObj.message = "Product stock is required";
        }
        if(!data.category_id) {
            errorObj.message = "Product Category is required";
        }
        if(!data.price) {
            errorObj.message = "Product Price is required";
        }
        if(errorObj.message) throw errorObj;
        let product = await db.products.create({
            name: data.name,
            main_image: data.main_image,
            stock: data.stock,
            price: data.price,
            category_id: data.category_id
        });
        return product;
    } catch(error) {
        throw error;
    }
}
const editProduct = async (id, data) => {
    try {
        let errorObj = { statusCode:400 }
        var product = await db.products.findByPk(id);
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj
        product = await db.products.update(data, {
            where: { id }
        });
        return await db.products.findByPk(id);
    } catch (error) {
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var product = await db.products.findByPk(id);
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj
        // const exist = fs.existsSync("./.."+product.main_image);
        // console.log(exist);
        await db.products.destroy({
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