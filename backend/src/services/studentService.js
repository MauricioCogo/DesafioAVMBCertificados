import Student from "../models/Student.js";

export const createStudentService = async (data, institutionId) => {

    const student = await Student.create({
        name: data.name,
        cpf: data.cpf,
        birth_date: data.birth_date,
        institution_id: institutionId
    });
    
    return student;
}

export const getAllStudentsService = async (institutionId) => {
    const students = await Student.findAll({
        where: { institution_id: institutionId, deleted: false }
    });
    return students;
}

export const getStudentByIdService = async (id, institutionId) => {
    const student = await Student.findOne({
        where: { id, institution_id: institutionId, deleted: false }
    });

    if (!student) {
        throw new Error('NOT_FOUND');
    }
    return student;
}

export const updateStudentService = async (id, data, institutionId) => {
    const student = await getStudentByIdService(id, institutionId);

    if (!student) {
        throw new Error('NOT_FOUND');
    }

    await student.update({
        name: data.name,
        cpf: data.cpf,
        birth_date: data.birth_date
    });

    return student;

}

export const deleteStudentService = async (id, institutionId) => {
    const student = await getStudentByIdService(id, institutionId);

    if (!student) {
        throw new Error('NOT_FOUND');
    }
    await student.update({ deleted: true, deleted_at: new Date() });
    return student;
}

export const importStudentService = async (data, institutionId, transiction) => {
    console.log(data);
    
    return await Student.create({
        name: data.nome,
        cpf: data.cpf,
        birth_date: data.dt_nascimento,
        institution_id: institutionId
    }, { transaction: transiction });
};