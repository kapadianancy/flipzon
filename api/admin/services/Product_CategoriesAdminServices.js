const Product_category = require("../../models/Product_category");
const { sequelize } = require('../../db/db');
function sayHelloTo() {
    return `Hi,!`;
  }

const getProduct_Category = async () => {
    try{
        // return await sequelize.query("select distinct parent FROM product_categories where isDeleted=0 ORDER BY parent and Group By name,image");
        return await Product_category.findAll({
            where: {
                IsDeleted:0
            }
        })
    }catch(error) {
        throw error;    
    }  
}
const getProduct_CategorySearch = async (search) => {
    try{
        return await Product_category.findAll({
            where: {
                IsDeleted:0,
                name:search
            }
        })
    }catch(error) {
        throw error;    
    }  
}
const getSingleProduct_Category = async (id) =>{
    try {
        return await Product_category.findAll({
            where: {
                id:id,
                IsDeleted:0
            }
        })
    } catch (error) {
        throw error;
    }   
}
const addProduct_Category = async (id,data) => {
    try {
        let errorObj = {
            statusCode: 400
        }
        if(!data.name) {
            errorObj.message = "category Name is required";
        }
        if(!data.image) {
            errorObj.message = "Image is required";
        }
        if(errorObj.message) throw errorObj;
        let list = await Product_category.findOne({order: [ [ 'createdAt', 'DESC' ]]});
        let newId=1;
        let nid = id.toString();
        let product_category="";
        if(nid==="0")
        {
            newId = 0;
            console.log("new = "+newId);
            product_category = await Product_category.create({
                name: data.name,
                image:data.image,
                // parent:NULL
            }).then((data)=>{
                let product_categorys = Product_category.findByPk(data.id);
                product_categorys = Product_category.update({parent : data.id}, {
                    where: { id:data.id }
                });
            }).catch(error=>{
                console.log("update "+error);
            });
        }
        else
        {
            product_category = await Product_category.create({
                name: data.name,
                image:data.image,
                parent:nid
            })
        }
        // console.log(product_category);
        return product_category;
    } catch(error) {
        throw error.message;
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
    edit_DeleteProduct_Category,
    getProduct_CategorySearch,
    sayHelloTo
}