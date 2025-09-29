// backend/src/config/config.js
module.exports = {
  development: {
    username: "root",
    password: "1234",
    database: "fastravel_dev",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "1234",
    database: "fastravel_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "1234",
    database: "fastravel_prod",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
