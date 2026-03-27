import Course from '../models/Course.js';

export const createCourseService = async (data, institutionId) => {

    const course = await Course.create({
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        teacher: data.teacher,
        institution_id: institutionId
    });

    return course;
};

export const getAllCoursesService = async (institutionId) => {
    const courses = await Course.findAll({
        where: { institution_id: institutionId, deleted: false }
    });
    return courses;
}

export const getCourseByIdService = async (id, institutionId) => {
    const course = await Course.findOne({
        where: { id, institution_id: institutionId, deleted: false }
    });

    if (!course) {
        throw new Error('NOT_FOUND');
    }

    return course;
}

export const updateCourseService = async (id, data, institutionId) => {
    const course = await getCourseByIdService(id, institutionId);

    if (!course) {
        throw new Error('NOT_FOUND');
    }

    await course.update({
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        teacher: data.teacher
    });

    return course;

}

export const deleteCourseService = async (id, institutionId) => {
    const course = await getCourseByIdService(id, institutionId);

    if (!course) {
        throw new Error('NOT_FOUND');
    }

    await course.update({ deleted: true, deleted_at: new Date() });
}

export const findOrCreateCourse = async (courseData, institutionId, transaction) => {

    let course = await Course.findOne({
        where: {
            name: courseData.nome,
            institution_id: institutionId
        },
        transaction
    });

    if (!course) {
        course = await Course.create({
            name: courseData.nome,
            start_date: courseData.dt_inicio,
            end_date: courseData.dt_fim,
            teacher: courseData.docente,
            institution_id: institutionId
        }, { transaction });
    }

    return course;
};