'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name: Sequelize.STRING,
      cpf: Sequelize.STRING,
      birth_date: Sequelize.DATE,

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

      await queryInterface.dropTable('students');
  }
};
