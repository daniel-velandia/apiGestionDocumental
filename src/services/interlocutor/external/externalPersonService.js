import externalPersonRepository from "../../../repositories/interlocutor/external/externalPersonRepository.js";
import crypto from "crypto";
import userService from "../../user/userService.js";
import interlocutorTypeService from "../../data/interlocutorTypeService.js";
import { ExternalPersonEntityModel } from "../../../models/interlocutor/external/externalPersonModel.js";

const create = async (externalPerson, username) => {
    validateData(externalPerson);

    const user = await userService.searchByUsername(username);
    const interlocutorType = await interlocutorTypeService.searchTypeExternalPerson();

    externalPerson.interlocutorId = crypto.randomUUID();
    externalPerson.interlocutorTypeDbId = interlocutorType.id;
    externalPerson.userDbId = user.id;

    await externalPersonRepository.create(externalPerson);

    return "Persona externa creada con éxito";
}

const read = async (username) => {
    const externalPersons = [];
    const user = await userService.searchByUsername(username);
    const array = await externalPersonRepository.read(user.id);
    array.forEach(externalPerson => externalPersons.push(new ExternalPersonEntityModel(externalPerson)));

    return externalPersons;
}

const searchById = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const externalPerson = await externalPersonRepository.searchById(interlocutorId, user.id);
    validateExternalPerson(externalPerson);

    return new ExternalPersonEntityModel(externalPerson);
}

const edit = async (interlocutorId, externalPerson, username) => {
    validateData(externalPerson);

    const user = await userService.searchByUsername(username);
    const currentExternalPerson = await externalPersonRepository.searchById(interlocutorId, user.id);

    validateExternalPerson(currentExternalPerson);
    
    currentExternalPerson.idCard = externalPerson.idCard;
    currentExternalPerson.name = externalPerson.name;
    currentExternalPerson.lastName = externalPerson.lastName;
    currentExternalPerson.email = externalPerson.email;
    currentExternalPerson.phone = externalPerson.phone;
    currentExternalPerson.address = externalPerson.address;

    await externalPersonRepository.edit(currentExternalPerson);

    return "Persona externa actualizada con éxito";
}

const remove = async (externalPersonId, username) => {
    const user = await userService.searchByUsername(username);
    const externalPerson = await externalPersonRepository.searchById(externalPersonId, user.id);
    validateExternalPerson(externalPerson);

    await externalPersonRepository.remove(externalPerson);
}

const validateData = (externalPerson) => {
    if (!externalPerson.idCard || 
        !externalPerson.name || 
        !externalPerson.lastName || 
        !externalPerson.email || 
        !externalPerson.phone || 
        !externalPerson.address) {
        throw new Error("Datos incorrectos");
    }
}

const validateExternalPerson = (externalPerson) => {
    if(!externalPerson) {
        throw new Error("Persona externa no encontrada");
    }
}

export default { create, read, searchById, edit, remove };