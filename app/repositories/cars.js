const { Op } = require("sequelize");
const { Car } = require("../models");

module.exports = {
  create(createArgs) {
    return Car.create(createArgs);
  },

  update(id, updateArgs) {
    return Car.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(argsObj) {
    return Car.destroy({where:argsObj});
  },

  find(argsObj) {
    return Car.findOne({where: argsObj, include: [{ all: true, nested: true }]});
  },

  findName(name, user_id) {
    let args = {};
    args.name = {[Op.like]: `%${name}%`};
    user_id != undefined ? args.user_id = user_id : '';
    return Car.findAll({where: args, include: [{ all: true, nested: true }]});
  },

  findAll(argsObj) {
    return Car.findAll(argsObj);
  },
  
};
