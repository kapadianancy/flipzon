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
                msg: 'required Image'
            }
        }
    },
    thumbnailImage:
    {
        type:DataTypes.TEXT,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'required thumbnailImage'
            }
        }
    },
    parent: DataTypes.INTEGER,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

Product_category.hasMany(Product_category, {
    foreignKey: "parent",
    as: "parentCategory",
    onDelete: "CASCADE",
    onUpdate: "NO ACTION"
})
    
module.exports=Product_category;