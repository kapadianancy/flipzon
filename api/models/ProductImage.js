const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize, roles) => {
    let ProductImage = sequelize.define('product_image', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
        }
    });
    return ProductImage;
}