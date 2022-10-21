'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('TypeCars', [{
        name: 'SUV',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'MPV',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Crossover',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Hatchback',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Sedan',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Sport Sedan',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Convertible',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Station Wagon',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Elektrik',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Hybrid',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Off Road',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Pick Up',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'LCGC',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
