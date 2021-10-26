const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { DB } = require("../config/db.config.js");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    timezone: config.timezone,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.schedule = require("./schedule.js")(sequelize, Sequelize);
db.detail = require("./detail.js")(sequelize, Sequelize);
db.model = require("./model.js")(sequelize, Sequelize);
db.modeldetail = require("./modeldetail.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
