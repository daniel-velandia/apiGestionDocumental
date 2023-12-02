import entityRepository from "../repositories/parents/entityRepository.js";
import entityTypeRepository from "../repositories/others/entityTypeRepository.js";
import personRepository from "../repositories/parents/personRepository.js";
import externalPersonRepository from "../repositories/externalPersonRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import { entityTypes } from "../utils/constants.js";
import { validateEntityExistence, validateExternalPersonData } from "../utils/validator.js";
import { externalPersonDataMapper } from "../utils/mapper.js";

const create = async (externalPerson, username) => {
    validateExternalPersonData(externalPerson);

    const user = await userRepository.searchByUsername(username);

    externalPerson.entityId = crypto.randomUUID();
    externalPerson.userId = user.id;

    const entityType = await entityTypeRepository.searchByType(entityTypes[2]);
    const entityId = await entityRepository.create(externalPerson, entityType.id);
    const personId = await personRepository.create(externalPerson);
    await externalPersonRepository.create(externalPerson.address, entityId, personId);

    return "Persona externa creada con éxito";
};

const read = async (username) => {
    const user = await userRepository.searchByUsername(username);
    return await externalPersonRepository.read(user.id);
};

const searchById = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const externalPerson = await externalPersonRepository.searchById(entityId, user.id);
    validateEntityExistence(externalPerson, "Persona externa no encontrada");

    return externalPerson;
};

const edit = async (entityId, externalPerson, username) => {
    validateExternalPersonData(externalPerson);

    const user = await userRepository.searchByUsername(username);
    const currentExternalPerson = await externalPersonRepository.searchById(entityId, user.id);

    validateEntityExistence(currentExternalPerson, "No se puede realizar esta acción");
    externalPersonDataMapper(currentExternalPerson, externalPerson);

    await entityRepository.edit(currentExternalPerson);
    await personRepository.edit(currentExternalPerson);
    await externalPersonRepository.edit(currentExternalPerson);

    return "Persona externa actualizada con éxito";
};

const remove = async (externalPersonId, username) => {
    const user = await userRepository.searchByUsername(username);
    const externalPerson = await externalPersonRepository.searchById(externalPersonId, user.id);
    validateEntityExistence(externalPerson, "No se puede realizar esta acción");

    await entityRepository.remove(externalPerson.entity_id);
    await personRepository.remove(externalPerson.person_id);
};

export default { create, read, searchById, edit, remove };