import companyRepository from "../../repositories/companyRepository.js";
import entityRepository from "../../repositories/parents/entityRepository.js";
import externalPersonRepository from "../../repositories/externalPersonRepository.js";
import functionaryRepository from "../../repositories/functionaryRepository.js";
import studentRepository from "../../repositories/studentRepository.js";
import { entityTypes } from "../../utils/constants.js";

const searchById = async (entityId, userId) => {
    return await entityRepository.searchById(entityId, userId);
}

const searchEntityByType = async (type, entityId, createdDate, userId) => {
    var entity = null;
    switch (type) {
        case entityTypes[0]:
            entity = await searchStudent(entityId, userId, createdDate);
            break;
        case entityTypes[1]:
            entity = await functionaryRepository.searchById(entityId, userId);
            break;
        case entityTypes[2]:
            entity = await externalPersonRepository.searchById(entityId, userId);
            break;
        case entityTypes[3]:
            entity = await companyRepository.searchById(entityId, userId);
            break;
    }

    return entity;
}

const searchStudent = async (entityId, userId, createdDate) => {
    const studentHistory = await studentRepository.searchById(entityId, userId);

    for (let index = 0; index < studentHistory.length; index++) {
        const studentDate = new Date(studentHistory[index].created_date);
        const documentDate = new Date(createdDate);

        if(studentDate >= documentDate) { 
            return studentHistory[index - 1]
        };
    }
} 

export default { searchById, searchEntityByType };