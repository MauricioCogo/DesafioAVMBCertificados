import Sequelize, { Model } from 'sequelize';

class StudentCourse extends Model {
    static init(sequelize) {
        super.init(
            {
                status: Sequelize.STRING,
                hash: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                file_path: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                url_callback: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                deleted: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: false
                },
                deleted_at: Sequelize.DATE
            },
            { sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Student, {
            foreignKey: 'student_id'
        });

        this.belongsTo(models.Course, {
            foreignKey: 'course_id'
        });
    }
}

export default StudentCourse;