'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      coords: {
        type: Sequelize.STRING
      },
      full_address: {
        type: Sequelize.STRING
      },
      work_time: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      locality: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      description: {
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
    await queryInterface.dropTable('offices');
  }
};