import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import fs from 'fs';

const schema = JSON.parse(
    fs.readFileSync(new URL('../schemas/alunoSchema.json', import.meta.url))
);

const ajv = new Ajv({
    allErrors: true
});

addFormats(ajv);

const validate = ajv.compile(schema);

export const validateStudent = (data) => {
    const valid = validate(data);

    if (!valid) {
        const error = new Error('VALIDATION_ERROR');
        error.details = validate.errors
        throw error;
    }

    return true;
};