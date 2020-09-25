const Product_category = require("../../models/Product_category");

const getProduct_Category = async () => {
    try{
        return await Product_category.findAll({
            where: {
                IsDeleted:0
            }
        })
    }catch(error) {
        throw error;
    }  
}
const getSingleProduct_Category = async (id) =>{
    try {
        return await Product_category.findByPk(id);
    } catch (error) {
        throw error;
    }   
}
const addProduct_Category = async (data) => {
    try {
        let errorObj = {
            statusCode: 400
        }
        if(!data.name) {
            errorObj.message = "category_name is required";
        }
        if(!data.description) {
            errorObj.message = "description is required";
        }
        if(errorObj.message) throw errorObj;
        let product_category = await Product_category.create({
            name: data.name,
            description: data.description
        });
        return product_category;
    } catch(error) {
        throw error;
    }
}
const editProduct_Category = async (id, data) => {
    try {
        let errorObj = { 
            statusCode:200 
        }
        let product_category = await Product_category.findByPk(id);
        if(!product_category) {
            errorObj.statusCode = 404
            errorObj.message = "Product_Category not found";
        }
        if(errorObj.message) throw errorObj
        product_category = await Product_category.update(data, {
            where: { id : id }
        });
        return await Product_category.findByPk(id);
    } catch (error) {
        throw error;
    }
}
const edit_DeleteProduct_Category = async (id) => {
    try {
        let errorObj = { 
            statusCode:200 
        }
        let product_category = await Product_category.findByPk(id);
        if(!product_category) {
            errorObj.statusCode = 404
            errorObj.message = "Product_Category not found";
        }
        if(errorObj.message) throw errorObj
        product_category = await Product_category.update({isDeleted:1}, {
            where: { id : id }
        });
        return await Product_category.findByPk(id);
    } catch (error) {
        throw error;
    }
}
const deleteProduct_Category = async (id) => {
    try {
        let errorObj = { statusCode:200 }
        var product_category = await Product_category.findByPk(id);
        if(!product_category) {
            errorObj.statusCode = 404
            errorObj.message = "Product_Category not found";
        }
        if(errorObj.message) throw errorObj
        await Product_category.destroy({
            where: { id : id }
        });
        return product_category;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getProduct_Category,
    getSingleProduct_Category,
    addProduct_Category,
    editProduct_Category,
    deleteProduct_Category,
    edit_DeleteProduct_Category
}