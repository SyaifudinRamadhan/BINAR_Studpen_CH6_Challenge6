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
   await queryInterface.bulkInsert('Users', [{
      id: "ee831b29-47e3-495f-82b9-e45797044d89",
      username: "admin",
      first_name: "admin",
      last_name: "admin",
      email: "admin@binar.com",
      password: '$2a$10$X7V.FfeIM09h57xISUivxuyaQ3UmjXQcUL.Y6QcgL3icAar5PF4jm',
      access_level: 2,
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
