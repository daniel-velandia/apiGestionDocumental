import externalPersonRepository from "../repositories/externalPersonRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";

const create = (externalPerson, username) => {
    return new Promise((resolve, reject) => {

        if(!externalPerson.idCard || 
           !externalPerson.name || 
           !externalPerson.lastName || 
           !externalPerson.email || 
           !externalPerson.phone || 
           !externalPerson.address) {

            reject("datos incorrectos");
            return;
        }

        const user = userRepository.searchByUsername(username);

        externalPerson.externalPersonId = crypto.randomUUID();
        externalPerson.user = user;

        externalPersonRepository.create(externalPerson);

        resolve("Persona externa creada con exito");
    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {
        const user = userRepository.searchByUsername(username);
        resolve(externalPersonRepository.read(user.userId));
    });
}

const detail = (id, username) => {
    return new Promise((resolve, reject) => {
        const externalPerson = externalPersonRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(externalPerson.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
        } else {
            resolve(externalPerson);
        }
    });
}

const edit = (id, externalPerson, username) => {
    return new Promise((resolve, reject) => {

        if(!externalPerson.idCard || 
           !externalPerson.name || 
           !externalPerson.lastName || 
           !externalPerson.email || 
           !externalPerson.phone || 
           !externalPerson.address) {
 
            reject("datos incorrectos");
            return;
        }

        const currentExternalPerson = externalPersonRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(currentExternalPerson.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        currentExternalPerson.idCard = externalPerson.idCard;
        currentExternalPerson.name = externalPerson.name;
        currentExternalPerson.lastName = externalPerson.lastName;
        currentExternalPerson.email = externalPerson.email;
        currentExternalPerson.phone = externalPerson.phone;
        currentExternalPerson.address = externalPerson.address;

        const externalPersonEdited = externalPersonRepository.edit(currentExternalPerson);

        if(externalPersonEdited !== null) {
            resolve("Persona externa actualizada con exito");
        } else {
            reject("Error al actualizar persona externa");
        }

    });
}

const remove = (id, username) => {
    return new Promise((resolve, reject) => {
        
        const externalPerson = externalPersonRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(externalPerson.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        externalPersonRepository.remove(externalPerson.externalPersonId);

        resolve();
    });
}

export default { create, read, detail, edit, remove };