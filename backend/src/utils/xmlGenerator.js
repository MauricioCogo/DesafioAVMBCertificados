import { create } from 'xmlbuilder2';
import fs from 'fs';

export const generateXML = (student, course, hash) => {

    const xml = create({ version: '1.0' })
        .ele('certificado')
            .ele('aluno').txt(student.name).up()
            .ele('cpf').txt(student.cpf).up()
            .ele('curso').txt(course.name).up()
            .ele('id').txt(course.id).up()
            .ele('data_inicio').txt(course.start_date).up()
            .ele('data_fim').txt(course.end_date).up()
            .ele('hash').txt(hash).up()
        .end({ prettyPrint: true });

    const filePath = `./certificates/${hash}.xml`;

    fs.writeFileSync(filePath, xml);

    return filePath;
};