import companyRepository from "../../../repositories/interlocutor/external/companyRepository.js";
import userService from "../../user/userService.js";
import interlocutorTypeService from "../../data/interlocutorTypeService.js";
import crypto from "crypto";
import { CompanyEntityModel } from "../../../models/interlocutor/external/companyModel.js";

const create = async (company, username) => {
    validateData(company);

    const user = await userService.searchByUsername(username);
    const interlocutorType = await interlocutorTypeService.searchTypeCompany();
    
    company.interlocutorId = crypto.randomUUID();
    company.interlocutorTypeDbId = interlocutorType.id;
    company.userDbId = user.id;

    await companyRepository.create(company);

    return "Empresa creada con exito";
}

const read = async (username) => {
    const companies = [];
    const user = await userService.searchByUsername(username);
    const array = await companyRepository.read(user.id);
    array.forEach(company => companies.push(new CompanyEntityModel(company)));

    return companies;
}

const searchById = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const company = await companyRepository.searchById(interlocutorId, user.id);
    validateCompany(company);

    return new CompanyEntityModel(company);
}

const edit = async (interlocutorId, company, username) => {
    validateData(company);

    const user = await userService.searchByUsername(username);
    const currentCompany = await companyRepository.searchById(interlocutorId, user.id);

    validateCompany(currentCompany);
    
    currentCompany.nit = company.nit;
    currentCompany.name = company.name;
    currentCompany.email = company.email;
    currentCompany.phone = company.phone;
    currentCompany.addresseeName = company.addresseeName;
    
    await companyRepository.edit(currentCompany);

    return "Empresa actualizada con exito";
}

const remove = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const company = await companyRepository.searchById(interlocutorId, user.id);
    validateCompany(company);

    await companyRepository.remove(company);
}

const validateData = (company) => {
    if (!company.nit || 
        !company.name || 
        !company.email || 
        !company.phone || 
        !company.addresseeName) {
        throw new Error("Datos incorrectos");
    }
}

const validateCompany = (company) => {
    if(!company) {
        throw new Error("Empresa no encontrada");
    }
}

export default { create, read, searchById, edit, remove };