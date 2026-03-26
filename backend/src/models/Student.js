import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cpf: Sequelize.STRING,
                birth_date: Sequelize.DATE
            },
            { sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Institution, {
            foreignKey: 'institution_id'
        });

        this.belongsToMany(models.Course, {
            through: 'student_courses',
            foreignKey: 'student_id',
            as: 'courses'
        });
    }
}

export default Student;