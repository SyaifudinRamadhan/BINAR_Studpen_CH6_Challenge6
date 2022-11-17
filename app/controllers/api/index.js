/**
 * @file contains entry point of controllers api module
 * @author Syaifudin Ramadhan
 */

const main = require("./main");
const v1 = require("./v1");
const midd = require('./middleware');

module.exports = {
  main,
  v1,
  midd,
};
