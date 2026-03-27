export const translateAjvError = (err) => {

    switch (err.keyword) {

        case 'minLength':
            return `deve ter no mínimo ${err.params.limit} caracteres`;

        case 'maxLength':
            return `deve ter no máximo ${err.params.limit} caracteres`;

        case 'pattern':
            return 'formato inválido';

        case 'format':
            if (err.params.format === 'date') {
                return 'deve ser uma data válida (YYYY-MM-DD)';
            }
            return 'formato inválido';

        case 'required':
            return `campo obrigatório: ${err.params.missingProperty}`;

        case 'additionalProperties':
            return `campo não permitido: ${err.params.additionalProperty}`;

        case 'type':
            return `tipo inválido, esperado ${err.params.type}`;

        default:
            return 'valor inválido';
    }
};