import entityRepository from "../repositories/parents/entityRepository.js";
import entityTypeRepository from "../repositories/others/entityTypeRepository.js";
import personRepository from "../repositories/parents/personRepository.js";
import dependenceRepository from "../repositories/others/dependenceRepository.js";
import functionaryRepository from "../repositories/functionaryRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import { entityTypes } from "../utils/constants.js";
import { validateEntityExistence, validateFunctionaryData } from "../utils/validator.js";
import { functionaryDataMapper } from "../utils/mapper.js";

const create = async (functionary, username) => {
    validateFunctionaryData(functionary);

    const user = await userRepository.searchByUsername(username);
    const dependence = await dependenceRepository.searchById(functionary.dependenceId);
    validateEntityExistence(dependence, "Dependencia invalida");

    functionary.entityId = crypto.randomUUID();
    functionary.userId = user.id;
    functionary.dependenceId = dependence.id;

    const entityType = await entityTypeRepository.searchByType(entityTypes[1])
    const entityId = await entityRepository.create(functionary, entityType.id);
    const personId = await personRepository.create(functionary);
    await functionaryRepository.create(entityId, personId, functionary.dependenceId);

    return "funcionario creado con exito";
}

const read = async (username) => {
    const user = await userRepository.searchByUsername(username);
    return await functionaryRepository.read(user.id);
}

const searchById = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const functionary = await functionaryRepository.searchById(entityId, user.id);
    validateEntityExistence(functionary, "Funcionario no encontrado");

    return functionary;
}

const edit = async (entityId, functionary, username) => {
    validateFunctionaryData(functionary);

    const user = await userRepository.searchByUsername(username);
    const currentFunctionary = await functionaryRepository.searchById(entityId, user.id)
    const dependence = await dependenceRepository.searchById(functionary.dependenceId);

    validateEntityExistence(currentFunctionary, "No se puede realizar esta acción");
    validateEntityExistence(dependence, "Dependencia invalida");
    functionaryDataMapper(currentFunctionary, functionary, dependence);

    await entityRepository.edit(currentFunctionary);
    await personRepository.edit(currentFunctionary);
    await functionaryRepository.edit(currentFunctionary);

    return "Persona externa actualizada con exito";

}

const remove = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const functionary = await functionaryRepository.searchById(entityId, user.id);
    validateEntityExistence(functionary, "No se puede realizar esta acción");

    await entityRepository.remove(functionary.entity_id);
    await personRepository.remove(functionary.person_id);
}

export default { create, read, searchById, edit, remove };