'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_courses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'students',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      status: Sequelize.STRING,
      hash: Sequelize.STRING,
      file_path: Sequelize.STRING,
      url_callback: Sequelize.STRING,

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

    await queryInterface.dropTable('student_courses');
  }
};
