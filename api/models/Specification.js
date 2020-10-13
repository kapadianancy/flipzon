const DataTypes = require("sequelize");
const db=require("../db/db");
const Product = require("./Product");

const Specification = db.sequelize.define('Specification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

// relations
Specification.belongsTo(Product,{
    foreignKey: "productId",
    as: "product",
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
});


module.exports=Specification;