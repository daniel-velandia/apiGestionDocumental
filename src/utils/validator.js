export const validateCompanyData = (company) => {
    const { nit, name, email, phone, addresseeName } = company;
    if (!nit || !name || !email || !phone || !addresseeName) {
        throw new Error("datos incorrectos");
    }
}

export const validateDocumentData = (document) => {
    const { name, fileNumber, file, documentTypeId, subject, annexes, senderId, addresseeId, typeFile, documentReceivedId } = document;
    if (!name || !fileNumber || !file || !documentTypeId || !subject || !annexes || !senderId || !addresseeId || (!typeFile && !documentReceivedId)) {
        throw new Error("Datos incorrectos");
    }
}

export const validateDocumentReceived = (typeFile, documentReceived) => {
    if (!typeFile && !documentReceived) {
        throw new Error("No se ha encontrado el archivo recibido");
    }
}

export const validateFunctionaryData = (functionary) => {
    const { idCard, name, lastName, email, phone, dependenceId } = functionary;
    if (!idCard || !name || !lastName || !email || !phone || !dependenceId) {
        throw new Error("Invalid functionary data");
    }
}

export const validateExternalPersonData = (externalPerson) => {
    const { idCard, name, lastName, email, phone, address } = externalPerson;
    if (!idCard || !name || !lastName || !email || !phone || !address) {
        throw new Error("Datos incorrectos para la persona externa");
    }
}

export const validateStudentData = (student) => {
    const { idCard, name, lastName, email, phone, careerId, semester } = student;
    if (!idCard || !name || !lastName || !email || !phone || !careerId || !semester) {
        throw new Error("Datos incorrectos");
    }
}

export const validateUserData = (user) => {
    const { username, email, password } = user;
    if (!username || !email || !password) {
        throw new Error("datos incorrectos");
    }
}

export const validateEntityExistence = (entity, errorMessage) => {
    if (!entity) {
        throw new Error(errorMessage);
    }
}