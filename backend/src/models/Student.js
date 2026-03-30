import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cpf: Sequelize.STRING,
                birth_date: Sequelize.DATE,
                deleted: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                deleted_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                }
            },
            { sequelize, tableName: 'students' }
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