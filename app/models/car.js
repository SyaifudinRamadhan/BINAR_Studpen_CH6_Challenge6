'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      this.belongsTo(models.TypeCar, {
        foreignKey: 'type_car',
        as: 'type'
      });
    }
  }
  Car.init({
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type_car: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    available_at: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    user_id: DataTypes.UUID,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    transmission: DataTypes.STRING,
    year: DataTypes.INTEGER,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};