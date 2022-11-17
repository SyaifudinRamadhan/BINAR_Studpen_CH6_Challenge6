/**
 * @file Manages database connection configuration.
 * @author Syaifudin Ramadhan
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "av59PuXFM3lsuu7ieREp",
  DB_HOST = "postgresql://postgres:av59PuXFM3lsuu7ieREp@containers-us-west-127.railway.app:7434/railway",
  DB_NAME = "railway",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
  },
};
