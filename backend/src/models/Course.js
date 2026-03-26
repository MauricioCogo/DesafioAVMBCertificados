import Sequelize, { Model } from 'sequelize';

class Course extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                teacher: Sequelize.STRING
            },
            { sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Institution, {
            foreignKey: 'institution_id'
        });

        this.belongsToMany(models.Student, {
            through: 'student_courses',
            foreignKey: 'course_id',
            as: 'students'
        });
    }
}

export default Course;