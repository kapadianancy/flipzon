const DataTypes = require("sequelize");
const db=require("../db/db");

const Product_category = db.sequelize.define('Product_category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'required name'
                }
            }
        },
        image:
        {
            type:DataTypes.TEXT,
            allowNull:false,
            validate: {
                notNull: {
                    msg: 'required image'
                }
            }
        },
        parent: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });


module.exports=Product_category;