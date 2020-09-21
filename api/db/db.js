const config = require("./db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

// exporting modules
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ROLES = ["user", "admin"];
db.users = require("../models/User")(sequelize, Sequelize);
db.roles = require("../models/Role")(sequelize, Sequelize, db.ROLES);
// db.courses = require("../models/Course")(sequelize, Sequelize);
// db.comments = require("../models/Comment")(sequelize, Sequelize);

// defining relationships
db.users.belongsTo(db.roles, {
    foreignKey: "roleId",
    as: "role"
});
// db.courses.hasMany(db.comments, { as: "comments" });
// db.comments.belongsTo(db.courses, {
//   foreignKey: "courseId",
//   as: "course"
// });
// db.comments.belongsTo(db.users, {
//   foreignKey: "userId",
//   as: "user"
// });
// db.users.hasMany(db.comments, { as: "comments" });

// sync with database
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("DB Droped, Resync and roles created.");
    initial();
});
function initial() {
    db.roles.create({
        id: 1,
        name: "admin",
        description: "Admin of the system"
    });
    db.roles.create({
        id: 2,
        name: "user",
        description: "user or customer of website"
    });
}

module.exports = db;