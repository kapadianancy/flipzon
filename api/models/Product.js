const DataTypes = require("sequelize");
const db=require("../db/db");
const Product_category=require("./Product_category");

const Product =db.sequelize.define("Product", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:
        {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        main_image:
        {
            type:DataTypes.TEXT,
            allowNull:false
        },
        stock:
        {
            type:DataTypes.INTEGER,
            allowNull:false
        },        
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isInOffer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        videoLink: DataTypes.TEXT,
        categoryId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
});

//relationship
Product.belongsTo(Product_category,{
    foreignKey:"categoryId",
    onDelete:"cascade",
    as:"Product_category"
});

module.exports = Product;
