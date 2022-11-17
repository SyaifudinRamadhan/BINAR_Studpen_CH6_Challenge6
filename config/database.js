/**
 * @file Manages database connection configuration.
 * @author Syaifudin Ramadhan
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "av59PuXFM3lsuu7ieREp",
  DB_HOST = "containers-us-west-127.railway.app",
  DB_NAME = "railway",
  DB_PORT = "7434"
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
};
