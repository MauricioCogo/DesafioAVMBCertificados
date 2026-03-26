import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../schemas/alunoSchema.json' assert { type: 'json' };

const ajv = new Ajv({
    allErrors: true
});

addFormats(ajv);

const validate = ajv.compile(schema);

export const validateStudent = (data) => {
    const valid = validate(data);

    if (!valid) {
        throw new Error(
            ajv.errorsText(validate.errors, { separator: '\n' })
        );
    }

    return true;
};