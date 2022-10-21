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
     await queryInterface.bulkInsert('Cars', [{
      id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
      name: "Ford",
      image: "/images/car01.min.jpg",
      price: 200000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
     },{
      id: "9ff03bbc-b18c-4ba7-8f3a-4c4b5c2f6c77",
      name: "BMW X5",
      image: "/images/car02.min.jpg",
      price: 210000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
     },{
      id: "bf6b5c43-1377-4ae0-8908-310c64266f81",
      name: "Lincoln MKZ",
      image: "/images/car03.min.jpg",
      price: 120000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
     },{
      id: "5b67f1d7-92d4-41c7-8577-4435740aadf1",
      name: "BMW M5",
      image: "/images/car04.min.jpg",
      price: 220000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
     },{
      id: "23574b8f-3e89-4685-a348-67c1f7e5b3c4",
      name: "Lincoln",
      image: "/images/car05.min.jpg",
      price: 200000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
     },{
      id: "3eead6db-c536-406b-9bc5-85d4c6e38a76",
      name: "Fort Fiesta",
      image: "/images/car06.min.jpg",
      price: 260000,
      capacity: 2,
      description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      available_at: new Date("2022-03-23T15:49:05.563Z"),
      transmission: "Automatic",
      available: true,
      type_car: 1,
      year: 2022,
      size:"medium",
      user_id:"ee831b29-47e3-495f-82b9-e45797044d89",
      deleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
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
