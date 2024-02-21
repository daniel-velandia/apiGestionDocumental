import interlocutorTypeRepository from "../../repositories/data/interlocutorTypeRepository.js";
import { interlocutorTypes } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await interlocutorTypeRepository.isEmpty();

    if(isEmpty) {
        for (const key in interlocutorTypes) {
            if (Object.hasOwnProperty.call(interlocutorTypes, key)) {
                await interlocutorTypeRepository.create(interlocutorTypes[key]);
            }
        }
    }
}

const read = async () => {
    return await interlocutorTypeRepository.read();
}

const searchTypeStudent = async () => {
    return await searchByName(interlocutorTypes.student);
}

const searchTypeFunctionary = async () => {
    return await searchByName(interlocutorTypes.functionary);
}

const searchTypeExternalPerson = async () => {
    return await searchByName(interlocutorTypes.externalPerson);
}

const searchTypeCompany = async () => {
    return await searchByName(interlocutorTypes.company);
}

const searchByName = async (name) => {
    const interlocutorType = await interlocutorTypeRepository.searchByName(name);
    if(!interlocutorType) {
        throw new Error("Tipo de interlocutor invalido");
    }

    return interlocutorType;
}

export default { 
    create, 
    read, 
    searchTypeStudent, 
    searchTypeFunctionary, 
    searchTypeExternalPerson, 
    searchTypeCompany 
};