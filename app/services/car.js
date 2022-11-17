const carRepo = require("../repositories/cars");
const fs = require('node:fs');
const path = require('path');
const pubDir = path.join(__dirname, '../../bin/public');
const { Op } = require('sequelize');

module.exports = {        

  async create(req) {
    let create = await carRepo.create({
      name: req.body.name,
      type_car: req.body.type_car,
      price: req.body.price,
      available: req.body.available,
      available_at: req.body.available_at,
      deleted: req.body.deleted,
      image: req.body.image,
      user_id: req.user.id,
      capacity: req.body.capacity,
      description: req.body.description,
      transmission: req.body.transmission,
      year: req.body.year,
      size: req.body.size
    })

    return create;
  },

  async update(req) {
    let update = await carRepo.update( req.car.id, {
      //data
      name: req.body.name,
      type_car: req.body.type_car,
      price: req.body.price,
      available: req.body.available,
      available_at: req.body.available_at,
      deleted: req.body.deleted,
      image: req.body.image,
      user_id: req.user.id,
      capacity: req.body.capacity,
      description: req.body.description,
      transmission: req.body.transmission,
      year: req.body.year,
      size: req.body.size
    })
    return update;
  },

  async delete(req) {
    try {
      let objArg = {};
      objArg.id = req.params.id;
      req.user.access_level == 1 ? objArg.user_id = req.user.id : '';
      let car = await carRepo.find(objArg);
      let deleted = await carRepo.delete(objArg);

      if (deleted > 0) {
        fs.rm(path.join(pubDir, car.image), (err) => {
          console.log(err);
        });
      }
      return deleted;
    } catch (error) {
      return error
    }
  },

  async list(req) {
    try {
      let argsObj = {};
      req.user.access_level == 1 ? argsObj.where = {user_id : req.user.id} : '';
      argsObj.include = [{ all: true, nested: true }]
      const posts = await carRepo.findAll(argsObj);
      const postCount = posts.length;

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async get(req) {
    let argsObj = {};
    argsObj.id = req.params.id;
    req.user.access_level == 1 ? argsObj.user_id = req.user.id : '';
    return await carRepo.find(argsObj);
  },

  async getSize(req) {
    let argsObj = {};
    argsObj.size = req.params.size.toLowerCase();
    req.user.access_level == 1 ? argsObj.user_id = req.user.id : '';
    return await carRepo.findAll({where: argsObj, include: [{ all: true, nested: true }]});
  },

  async getName(req) {
    let user_id = undefined;
    req.user.access_level == 1 ? user_id = req.user.id : '';
    return await carRepo.findName(req.params.name, user_id);
  },

  async publicFilter(req) {
    let driverType = req.params.driverType;
    let date = req.params.date;
    let time = req.params.time;
    let countPeople = req.params.countPeople;

    let filterer = {};

    if (driverType != '-0-') {
      driverType == 1 ? driverType = true : driverType = false;
      filterer.available = driverType;
    }
    if (date != '-0-' || time != '-0-') {
      if (date == '-0-') date = new Date().getFullYear().toString() + '-' + new Date().getMonth().toString() + '-' + new Date().getDate().toString();
      if (time == '-0-') time = new Date().getHours().toString() + ':' + new Date().getMinutes().toString()

      let datetime = new Date(`${date} ${time}`);
      filterer.available_at = { [Op.lte]: datetime };
    }
    if (countPeople != '-0-') {
      filterer.capacity = { [Op.gte]: countPeople };
    }

    let dataFromDB = await carRepo.findAll({ where: filterer, include: [{ all: true, nested: true }] });

    return dataFromDB;
  }


};