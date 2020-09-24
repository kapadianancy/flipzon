const DataTypes = require("sequelize");
const db=require("../db/db");

const Role = db.sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });


module.exports=Role;