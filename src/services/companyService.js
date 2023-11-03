import companyRepository from "../repositories/companyRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";

const create = (company, username) => {
    return new Promise((resolve, reject) => {

        if(!company.nit || 
           !company.name || 
           !company.email || 
           !company.phone || 
           !company.addresseeName) {

            reject("datos incorrectos");
            return;
        }

        const user = userRepository.searchByUsername(username);

        company.companyId = crypto.randomUUID();
        company.user = user;

        companyRepository.create(company);

        resolve("Empresa creada con exito");
    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {
        const user = userRepository.searchByUsername(username);
        resolve(companyRepository.read(user.userId));
    });
}

const detail = (id, username) => {
    return new Promise((resolve, reject) => {
        const company = companyRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(company.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
        } else {
            resolve(company);
        }
    });
}

const edit = (id, company, username) => {
    return new Promise((resolve, reject) => {

        if(!company.nit || 
           !company.name || 
           !company.email || 
           !company.phone || 
           !company.addresseeName ) {
 
             reject("datos incorrectos");
             return;
        }

        const currentCompany = companyRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(currentCompany.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        currentCompany.nit = company.nit;
        currentCompany.name = company.name;
        currentCompany.email = company.email;
        currentCompany.phone = company.phone;
        currentCompany.adresseerName = company.adresseerName;

        const companyEdited = companyRepository.edit(currentCompany);

        if(companyEdited !== null) {
            resolve("Empresa actualizada con exito");
        } else {
            reject("Error al actualizar empresa");
        }

    });
}

const remove = (id, username) => {
    return new Promise((resolve, reject) => {
        
        const company = companyRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(company.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        companyRepository.remove(company.companyId);

        resolve();
    });
}

export default { create, read, detail, edit, remove };