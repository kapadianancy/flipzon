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
        }
    });


module.exports=Role;