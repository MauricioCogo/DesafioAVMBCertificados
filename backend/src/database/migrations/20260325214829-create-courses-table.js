'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name: Sequelize.STRING,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
      teacher: Sequelize.STRING,

      institution_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'institutions',
          key: 'id'
        }
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {

      await queryInterface.dropTable('courses');
  }
};
