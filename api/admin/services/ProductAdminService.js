const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Product = require("../../models/Product");
const Category = require("../../models/Product_category");
const ProductImages = require("../../models/Product_image");
const Specification = require("../../models/Specification");
const deleteBucketFile = require("../utils/deleteBucketFile");

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
        options.offset = 0 + (page-1) * limit;
        options.limit = +limit;
    }
    try {
        let total = await Product.count({ where: { isDeleted: false }});
        if(limit) {
            total = Math.ceil(total / +limit);
        }
        let products = await Product.findAll(options);
        return { total, products }
    } catch(error) {
        console.log(error.message);
    }
}
const fetchSingleProduct = async(id) => {
    try {
        let product = await Product.findOne({
            where: {
                id,
                isDeleted: false
            },
            attributes: [ "id", "name", "main_image", "stock", "price", "categoryId", "description", "isInOffer", "discount", "videoLink" ]
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
        let specifications = await Specification.findAll({
            where: {
                productId: id,
                isDeleted: false
            },
            attributes: [ "id", "title", "details", "isDeleted" ],
            row: true
        });
        product = {
            ...product.get({ row: true }),
            images,
            specifications
        }
        return product;
    } catch(error) {
        throw error;
    }
}
const fetchOutOfStockProducts = async (limit = 5, ascending=true) => {
    try {
        if(!limit) limit = 5;
        if(!ascending) ascending = true
        let products = await Product.findAll({
            where: {
                stock: {
                    [Op.lte]: limit
                },
                isDeleted: false
            },
            order: [
                ["stock", ascending ? "ASC" : "DESC" ]
            ]
        });
        return products;
    } catch (error) {
        throw {
            statusCode: 400,
            message: error.message
        }
    }
}
const searchProducts = async(wordsArr, strong) => {
    try {
        let qry = wordsArr.map( word => ({ [Op.like]: `%${word}%` }))
        let products = await Product.findAll({
            where: {
                name: {
                    [strong ? Op.and : Op.or]: qry
                },
                isDeleted: false
            },
            include: [
                { model: Category, as: "Product_category", attributes: ["name"] }
            ]
        });
        return products;
    } catch(error) {
        console.log("error while searching"+error.message);
        throw error
    }
}
const addProduct = async (data, images) => {
    try {
        // create product
        var product = await Product.create({
            name: data.name,
            main_image: data.main_image,
            stock: data.stock,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
            isInOffer: data.isInOffer === "true" ? true : false,
            discount: data.isInOffer === "true" ? data.discount : 0,
            videoLink: data.videoLink ? data.videoLink : "",
            thumbnail: data.thumbnail
        });
        product = product.get({ row: true })

        // handle product images
        if(images.length > 0) {
            // let imageData = images.map( image => ({ image: "/images/"+image.filename, productId: product.id }) );
            // images = await createThumbnail(images, product.id);
            images = images.map( img => ({ image: img[0], productId: product.id, thumbnail: img[1] }));
            images = await ProductImages.bulkCreate(images);
            images = images.map( el => el.get({row: true}));
        } else images = [];

        // handle product specifications
        let specifications;
        if(data.specifications && data.specifications.length > 0) {
            specifications = await addSpecifications(product.id, data.specifications, false);
        } else specifications = [];
        
        // merge all data
        product = {
            ...product,
            images,
            specifications
        }
        
        return product;
    } catch(error) {
        console.log(error);
        throw error;
    }
}
const editProduct = async (id, data, images) => {
    try {
        // do some validations
        let errorObj = { statusCode:400 }
        var product = await Product.findByPk(id);
        if(!product) {
            errorObj.statusCode = 404
            errorObj.message = "Product not found";
        }
        if(errorObj.message) throw errorObj

        // update product
        product = await Product.update(data, {
            where: { id }
        });

        // handle images
        if(images) {
            // let imageData = images.map( image => ({ image: "/images/"+image.filename, productId: id }) );
            // let imageData = await createThumbnail(images, id);
            let imageData = images.map( img => ({ image: img[0], productId: id, thumbnail: img[1] }));
            images = await ProductImages.bulkCreate(imageData);
        } else images = []

        // handle specifications
        let specifications;
        if(data.specifications && data.specifications.length > 0) {
            specifications = await addSpecifications(id, data.specifications, true);
        } else specifications = [];

        return {
            message: "Product Updated"
        }
    } catch (error) {
        console.log(error.message);
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
        var image = await ProductImages.findAll({
            where: {
                productId: id,
                isDeleted: false
            }
        });
        Promise.all( 
            image.reduce( (arr, img) => {
                arr.push(deleteBucketFile(img.dataValues.thumbnail));
                arr.push(deleteBucketFile(img.dataValues.image));
                return arr;
            }, [])
        )
        await Product.update({
            "isDeleted": true
        }, {
            where: { id }
        });
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const deleteProductImage = async (ids) => {
    try {
        let errorObj = { statusCode:400 }
        var image = await ProductImages.findAll({
            where: {
                id: ids,
                isDeleted: false
            }
        });
        if(!image) {
            errorObj.statusCode = 404
            errorObj.message = "Image not found";
        }
        if(errorObj.message) throw errorObj
        // console.log(image[0].dataValues.image);
        await Promise.all( 
            image.reduce( (arr, img) => {
                arr.push(deleteBucketFile(img.dataValues.thumbnail));
                arr.push(deleteBucketFile(img.dataValues.image));
                return arr;
            }, [])
        )

        await ProductImages.destroy({
            where: { id: ids }
        });
        return { message: "Image Deleted" };
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

// extras
const addSpecifications = async (productId, data, deleteBefore) => {
    // data format = [ { title, details } ]
    // console.log(data.specifications);
    try {
        if(deleteBefore) {
            await Specification.destroy({ where: { productId }});
        }
        let specifications = data.map( item => ({ title: item.title, details: item.details, productId: productId }));
        specifications = await Specification.bulkCreate(specifications);
        specifications = specifications.map( el => el.get({row: true}) );
        return specifications
    } catch(error) {
        console.log("error while adding specifications ", error.message);
        throw error;
    }
}
const createThumbnail = async (images, productId) => {
    var imageData = [];
    let thumbnail, img, name, image, webPath;
    let uniqueSuffix;

    for(let key in images) {
        image = images[key];
        uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        name = "public/thumbnails/"+uniqueSuffix+'.webp';
        webPath = "/thumbnails/"+uniqueSuffix+'.webp';
        try {
            img = await Jimp.read(image.destination+"/"+image.filename);
            thumbnail = await img.resize(100, 100).quality(90).grayscale().write(name)
            imageData.push({
                image: "/images/"+image.filename, productId, thumbnail: webPath
            });
        } catch(error) {
            console.error(error.message);
        }
    }
    return imageData;
}
module.exports = {
    fetchProducts,
    searchProducts,
    fetchSingleProduct,
    addProduct,
    editProduct,
    deleteProduct,
    deleteProductImage,
    fetchOutOfStockProducts,
    // editProductOffer
}