export const companyDataMapper = (currentCompany, newCompany) => {
    currentCompany.nit = newCompany.nit;
    currentCompany.name = newCompany.name;
    currentCompany.email = newCompany.email;
    currentCompany.phone = newCompany.phone;
    currentCompany.addressee_name = newCompany.addresseeName;
}

export const documentDataMapper = (currentDocument, document) => {
    currentDocument.name = document.name;
    currentDocument.file_number = document.fileNumber;
    currentDocument.type_file = document.typeFile;
    currentDocument.file = document.file;
    currentDocument.size = 4234;
    currentDocument.document_type_id = document.documentTypeId;
    currentDocument.subject = document.subject;
    currentDocument.annexes = document.annexes;
    currentDocument.requires_response = document.requiresResponse;
    currentDocument.sender_id = document.senderId;
    currentDocument.addressee_id = document.addresseeId;
}

export const externalPersonDataMapper = (currentExternalPerson, newExternalPerson) => {
    currentExternalPerson.id_card = newExternalPerson.idCard;
    currentExternalPerson.name = newExternalPerson.name;
    currentExternalPerson.last_name = newExternalPerson.lastName;
    currentExternalPerson.email = newExternalPerson.email;
    currentExternalPerson.phone = newExternalPerson.phone;
    currentExternalPerson.address = newExternalPerson.address;
}

export const functionaryDataMapper = (currentFunctionary, newFunctionary, dependence) => {
    currentFunctionary.id_card = newFunctionary.idCard;
    currentFunctionary.name = newFunctionary.name;
    currentFunctionary.last_name = newFunctionary.lastName;
    currentFunctionary.email = newFunctionary.email;
    currentFunctionary.phone = newFunctionary.phone;
    currentFunctionary.dependence_id = dependence.id;
}

export const studentDataMapper = (currentStudent, newStudent) => {
    currentStudent.idCard = newStudent.idCard;
    currentStudent.name = newStudent.name;
    currentStudent.last_name = newStudent.lastName;
    currentStudent.email = newStudent.email;
    currentStudent.phone = newStudent.phone;
}