const Product_category = require("../../models/Product_category");
const { Storage } = require('@google-cloud/storage');
var path = require('path');
const getProduct_Category = async (page,limit) => {
    try{
        let data = { 
            where: {
                IsDeleted:0
            }
        }
        if(limit && page) {
            data.offset = 0 + (page-1) * limit;
            data.limit = +limit;
        }
        try {
            let total = await Product_category.count({ where: { isDeleted: false }});
            if(limit) {
                total = Math.ceil(total / +limit);
            }
            let product_categories= await Product_category.findAll(data);
            
            return { total,product_categories }
        } catch(error) {
            console.log(error.message);
        }
        
    }catch(error) {
        throw error;    
    }  
}
const getProduct_CategoryParent = async (id) => {
    try{
        return await Product_category.findAll({
            where: {
                IsDeleted:0,
                parent:id
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
            product_category = await Product_category.create({
                name: data.name,
                image:data.image,
                thumbnailImage:data.thumbnailImage
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
                thumbnailImage:data.thumbnailImage,
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
        let del = await Product_category.findByPk(id);
        let newdel = del.image.split("/o/")[1];
        let cdel = newdel.split("?")[0];

        let newdel2 = del.thumbnailImage.split("/o/")[1];
        let cdel2 = newdel2.split("?")[0];

        var credPath = path.join(__dirname, '..', '..', '..','flipzon-key.json');
        storage = await new Storage({
            projectId: "flipzon-4cf32",
            keyFilename: credPath,
        });
        bucket = await storage.bucket("gs://flipzon-4cf32.appspot.com/");
        let bucketName = await storage.bucket("gs://flipzon-4cf32.appspot.com/");

        await storage.bucket(bucketName.name).file(cdel).delete();
        await storage.bucket(bucketName.name).file(cdel2).delete();

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
    getProduct_CategoryParent
}
        // return await sequelize.query("SELECT MIN(x.id),x.parent,x.name,x.image FROM `product_categories` x JOIN (SELECT p.parent,MIN(name) AS names,MIN(image) img FROM product_categories p GROUP BY p.parent) y ON y.parent = x.parent AND y.names = x.name AND y.img = x.image GROUP BY x.name,x.parent,x.image ORDER BY parent");
        // attributes: [
        //     [sequelize.fn('DISTINCT', sequelize.col('parent')) ,'parent'],
        // ],
        // return await Product_category.findAll({
        //     where: {
        //         IsDeleted:0
        //     }
        // })