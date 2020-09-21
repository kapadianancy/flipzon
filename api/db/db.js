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

// db.ROLES = ["user", "admin", "moderator", "tutor"];
// db.users = require("../models/User")(sequelize, Sequelize);
// db.roles = require("../models/Role")(sequelize, Sequelize, db.ROLES);
// db.courses = require("../models/Course")(sequelize, Sequelize);
// db.comments = require("../models/Comment")(sequelize, Sequelize);

// defining relationships
// db.roles.belongsToMany(db.users, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// });
// db.users.belongsToMany(db.roles, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// });
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
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("DB Droped, Resync and roles created.");
//     initial();
// });
// function initial() {
//     db.roles.create({
//         id: 1,
//         name: "user"
//     });
//     db.roles.create({
//         id: 2,
//         name: "moderator"
//     });
//     db.roles.create({
//         id: 3,
//         name: "admin"
//     });
//     db.roles.create({
//       id: 4,
//       name: "tutor"
//     });
// }

module.exports = db;