const DataTypes = require("sequelize");
const db=require("../db/db");
const Product=require("./Product");

const Product_image = db.sequelize.define('Product_image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        image:
        {
            type:DataTypes.TEXT,
            allowNull:false
        },
        thumbnail: DataTypes.TEXT,
        productId:
        {
            type:DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
    
Product_image.belongsTo(Product,{
    foreignKey:"productId",
    onDelete:"cascade",
    as:"product"
})

module.exports=Product_image;