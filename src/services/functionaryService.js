import functionaryRepository from "../repositories/functionaryRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";

const create = (functionary, username) => {
    return new Promise((resolve, reject) => {

        if(!functionary.idCard || 
           !functionary.name || 
           !functionary.lastName || 
           !functionary.email || 
           !functionary.phone || 
           !functionary.dependence) {

            reject("datos incorrectos");
            return;
        }

        const user = userRepository.searchByUsername(username);

        functionary.functionaryId = crypto.randomUUID();
        functionary.user = user;

        functionaryRepository.create(functionary);

        resolve("funcionario creado con exito");
    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {
        const user = userRepository.searchByUsername(username);
        resolve(functionaryRepository.read(user.userId));
    });
}

const detail = (id, username) => {
    return new Promise((resolve, reject) => {
        const functionary = functionaryRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(functionary.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
        } else {
            resolve(functionary);
        }
    });
}

const edit = (id, functionary, username) => {
    return new Promise((resolve, reject) => {

        if(!functionary.idCard || 
           !functionary.name || 
           !functionary.lastName || 
           !functionary.email || 
           !functionary.phone || 
           !functionary.dependence) {
 
            reject("datos incorrectos");
            return;
        }

        const currentFunctionary = functionaryRepository.searchById(id);
        const user = userRepository.searchByUsername(username);
        
        if(currentFunctionary.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        currentFunctionary.idCard = functionary.idCard;
        currentFunctionary.name = functionary.name;
        currentFunctionary.lastName = functionary.lastName;
        currentFunctionary.email = functionary.email;
        currentFunctionary.phone = functionary.phone;
        currentFunctionary.dependence = functionary.dependence;

        const functionaryEdited = functionaryRepository.edit(currentFunctionary);

        if(functionaryEdited !== null) {
            resolve("funcionario actualizado con exito");
        } else {
            reject("Error al actualizar funcionario");
        }

    });
}

const remove = (id, username) => {
    return new Promise((resolve, reject) => {
        
        const functionary = functionaryRepository.searchById(id);
        const user = userRepository.searchByUsername(username);
        
        if(functionary.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        functionaryRepository.remove(functionary.functionaryId);

        resolve();
    });
}

export default { create, read, detail, edit, remove };