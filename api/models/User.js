const DataTypes = require("sequelize");
const db=require("../db/db");
const roles=require("./Role");

const User =db.sequelize.define("user", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            is:/^[6-9][0-9]{9}$/
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER
        }
});

//relationship
User.belongsTo(roles,{
    foreignKey:"roleId",
    onDelete:"cascade",
    as:"role"
});

module.exports = User;