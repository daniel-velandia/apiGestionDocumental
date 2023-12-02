import companyRepository from "../repositories/companyRepository.js";
import userRepository from "../repositories/userRepository.js";
import entityTypeRepository from "../repositories/others/entityTypeRepository.js";
import entityRepository from "../repositories/parents/entityRepository.js";
import crypto from "crypto";
import { entityTypes } from "../utils/constants.js";
import { validateCompanyData, validateEntityExistence } from "../utils/validator.js";
import { companyDataMapper } from "../utils/mapper.js";

const create = async (company, username) => {
    validateCompanyData(company);

    const user = await userRepository.searchByUsername(username);
    
    company.entityId = crypto.randomUUID();
    company.userId = user.id;

    const entityType = await entityTypeRepository.searchByType(entityTypes[3])
    const entityId = await entityRepository.create(company, entityType.id);
    await companyRepository.create(company, entityId);

    return "Empresa creada con exito";
}

const read = async (username) => {
    const user = await userRepository.searchByUsername(username);
    return await companyRepository.read(user.id);
}

const searchById = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const company = await companyRepository.searchById(entityId, user.id);
    validateEntityExistence(company, "Empresa no encontrada");

    return company;
}

const edit = async (entityId, company, username) => {
    validateCompanyData(company);

    const user = await userRepository.searchByUsername(username);
    const currentCompany = await companyRepository.searchById(entityId, user.id);

    validateEntityExistence(currentCompany, "No se puede realizar esta acción");
    companyDataMapper(currentCompany, company);
    
    await entityRepository.edit(currentCompany);
    await companyRepository.edit(currentCompany);

    return "Empresa actualizada con exito";
}

const remove = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const company = await companyRepository.searchById(entityId, user.id);
    validateEntityExistence(company, "No se puede realizar esta acción");

    await entityRepository.remove(company.entity_id);
}

export default { create, read, searchById, edit, remove };