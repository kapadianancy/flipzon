const fs = require("fs");
const Product = require("../../models/Product");
const Category = require("../../models/Product_category");
const ProductImages = require("../../models/Product_image");

const fetchProducts = async (page, limit) => {
    let options = {
        where: {
            isDeleted: false
        },
        include: [
            { model: Category, as: "Product_category", attributes: ["name"] }
        ]
    }
    if(page && limit) {
        options.offset = page-1;
        options.limit = +limit;
    }
    return await Product.findAll(options)
}
const fetchSingleProduct = async(id) => {
    try {
        let product = await Product.findOne({
            where: {
                id,
                isDeleted: false
            },
            attributes: [ "id", "name", "main_image", "stock", "price", "categoryId", "description" ]
        });
        if(!product) throw { statusCode: 404, message: "Product not found" }
        let images = await ProductImages.findAll({
            where: {
                productId: id,
                isDeleted: false
            },
            attributes: [ "id", "image" ],
            row: true
        });
        product = {
            ...product.get({ row: true }),
            images
        }
        return product;
    } catch(error) {
        throw error;
    }
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
            description: data.description,
            categoryId: data.categoryId
        });
        product = product.get({ row: true })

        if(images.length > 0) {
            let imageData = images.map( image => ({ image: "/images/"+image.filename, productId: product.id }) );
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
const editProduct = async (id, data, images) => {
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

        if(images.length > 0) {
            let imageData = images.map( image => ({ image: "/images/"+image.filename, productId: id }) );
            images = await ProductImages.bulkCreate(imageData);
        } else images = []
        return {
            message: "Product Updated"
        }
    } catch (error) {
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var product = await Product.findOne({
            where: {
                id,
                isDeleted: false
            },
            attributes: [ "id", "name", "main_image", "stock", "price", "categoryId", "description" ]
        });
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj
        // const exist = fs.existsSync("./.."+product.main_image);
        // console.log(exist);
        await Product.update({
            "isDeleted": true
        }, {
            where: { id }
        });
        return product;
    } catch (error) {
        throw error;
    }
}
const deleteProductImage = async (id) => {
    try {
        let errorObj = { statusCode:400 }
        var image = await ProductImages.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
        if(!image) {
            errorObj.statusCode = 404
            errorObj.message = "Image not found";
        }
        if(errorObj.message) throw errorObj
        await ProductImages.update({
            "isDeleted": true
        }, {
            where: { id }
        });
        return { message: "Image Deleted" };
    } catch (error) {
        throw error;
    }
}
module.exports = {
    fetchProducts,
    fetchSingleProduct,
    addProduct,
    editProduct,
    deleteProduct,
    deleteProductImage
}