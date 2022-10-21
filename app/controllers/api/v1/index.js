/**
 * @file contains entry point of controllers api v1 module
 * @author Syaifudin Ramadhan
 */

const auth = require('./autenticate');
const car = require('./car');

module.exports = {
  auth, car
};
