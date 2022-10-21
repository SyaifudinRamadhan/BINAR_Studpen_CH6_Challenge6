'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'Cars',
        'description',
        {
          allowNull: false,
          type: Sequelize.TEXT,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Cars',
        'transmission',
        {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: ''
        }
      ),
      queryInterface.addColumn(
        'Cars',
        'year',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
