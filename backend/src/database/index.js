import Sequelize from 'sequelize';
import config from '../config/database.cjs';

import Institution from '../models/Institution.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';
import StudentCourse from '../models/StudentCourse.js';

const models = [
    Institution,
    Student,
    Course,
    StudentCourse
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config.development);

        models.forEach(model => model.init(this.connection));

        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();