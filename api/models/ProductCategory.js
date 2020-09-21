const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize, roles) => {
    let ProductCategory = sequelize.define('product_category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    });
    return ProductCategory;
}