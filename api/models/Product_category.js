const DataTypes = require("sequelize");
const db=require("../db/db");

const Product_category = db.sequelize.define('Product_category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });


module.exports=Product_category;