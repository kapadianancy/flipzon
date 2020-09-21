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
    },
    logging: false
  },
);

const db = {};

// exporting modules
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ROLES = ["user", "admin"];
db.users = require("../models/User")(sequelize, Sequelize);
db.roles = require("../models/Role")(sequelize, Sequelize, db.ROLES);
db.orders = require("../models/Order")(sequelize, Sequelize);
db.orderDetails = require("../models/OrderDetails")(sequelize, Sequelize);
db.products = require("../models/Product")(sequelize, Sequelize);
db.productCategories = require("../models/ProductCategory")(sequelize, Sequelize);

// defining relationships
db.users.belongsTo(db.roles, {
  foreignKey: "roleId",
  as: "role"
});
// db.products.belongsTo(db.productCategories, {
// 	foreignKey: "category_id",
// 	as: "category"
// });
// db.orderDetails.belongsTo(db.orders, {
//   foreignKey: "order_id",
//   as: "order"
// })
// db.orderDetails.belongsTo(db.products, {
// 	foreignKey: "product_id",
// 	as: "product"
// })
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