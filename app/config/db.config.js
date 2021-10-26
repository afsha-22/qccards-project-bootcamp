module.exports = {
  HOST: "localhost",
  PORT: "3306",
  USER: "root",
  PASSWORD: "Rooney@800",
  DB: "testdb",
  dialect: "mysql",
  timezone: "Australia/Melbourne",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
