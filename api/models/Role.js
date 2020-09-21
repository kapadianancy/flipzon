const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize, roles) => {
    let Role = sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            isIn: [roles]
        },
        description: {
            type: DataTypes.STRING,
        }
    });
    return Role;
}