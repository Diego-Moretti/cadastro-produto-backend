export function validateProductData(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.name !== undefined) {
        if (!data.name || typeof data.name !== 'string') {
            errors.push('O nome do produto é obrigatório.');
        }
    }

    if (data.description !== undefined && data.description.length > 500) {
        errors.push('A descrição deve ter no máximo 500 caracteres.');
    }

    if (!isUpdate || data.price !== undefined) {
        if (typeof data.price !== 'number' || data.price <= 0) {
            errors.push('O preço deve ser um número positivo.');
        }
    }

    if (!isUpdate || data.stock !== undefined) {
        if (!Number.isInteger(data.stock) || data.stock < 0) {
            errors.push('O estoque deve ser um número inteiro positivo.');
        }
    }

    return errors;
}