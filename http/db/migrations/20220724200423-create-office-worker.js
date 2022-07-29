'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('office_workers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      office_id: {
        type: Sequelize.INTEGER
      },
      job_title: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('office_workers');
  }
};