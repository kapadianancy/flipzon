const DataTypes = require("sequelize");
const db=require("../db/db");
const Product = require("./Product");
const User = require("./User");

const Review = db.sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
});


// relations
Review.belongsTo(Product, {
    foreignKey:"productId",
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    as:"product"
});

Review.belongsTo(User, {
    foreignKey:"userId",
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    as:"user"
});


module.exports=Review;