const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize, roles) => {
    let Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        order_date: {
            type: DataTypes.DATE,
        },
        total_price: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        }
    });
    return Order;
}