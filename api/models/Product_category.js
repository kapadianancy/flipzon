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
        image:
        {
            type:DataTypes.TEXT,
            allowNull:false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });


module.exports=Product_category;