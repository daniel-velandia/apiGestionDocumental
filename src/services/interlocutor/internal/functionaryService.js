import functionaryRepository from "../../../repositories/interlocutor/internal/functionaryRepository.js";
import userService from "../../user/userService.js";
import interlocutorTypeService from "../../data/interlocutorTypeService.js";
import dependenceService from "../../data/dependenceService.js";
import crypto from "crypto";
import { FunctionaryEntityModel } from "../../../models/interlocutor/internal/functionaryModel.js";

const create = async (functionary, username) => {
    validateData(functionary);

    const user = await userService.searchByUsername(username);
    const interlocutorType = await interlocutorTypeService.searchTypeFunctionary();

    await dependenceService.validate(functionary.dependenceDbId);

    functionary.interlocutorId = crypto.randomUUID();
    functionary.interlocutorTypeDbId = interlocutorType.id;
    functionary.userDbId = user.id;

    await functionaryRepository.create(functionary);

    return "funcionario creado con exito";
}

const read = async (username) => {
    const funcionaries = [];
    const user = await userService.searchByUsername(username);
    const array = await functionaryRepository.read(user.id);
    array.forEach(functionary => funcionaries.push(new FunctionaryEntityModel(functionary)));
    
    return funcionaries;
}

const searchById = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const functionary = await functionaryRepository.searchById(interlocutorId, user.id);
    validateFunctionary(functionary);

    return new FunctionaryEntityModel(functionary);
}

const edit = async (interlocutorId, functionary, username) => {
    validateData(functionary);

    const user = await userService.searchByUsername(username);
    const currentFunctionary = await functionaryRepository.searchById(interlocutorId, user.id);
    
    validateFunctionary(currentFunctionary);

    await dependenceService.validate(functionary.dependenceDbId);

    currentFunctionary.idCard = functionary.idCard;
    currentFunctionary.name = functionary.name;
    currentFunctionary.lastName = functionary.lastName;
    currentFunctionary.email = functionary.email;
    currentFunctionary.phone = functionary.phone;
    currentFunctionary.dependenceDbId = functionary.dependenceDbId;

    await functionaryRepository.edit(currentFunctionary);

    return "Funcionario actualizado con exito";

}

const remove = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const functionary = await functionaryRepository.searchById(interlocutorId, user.id);
    validateFunctionary(functionary);

    await functionaryRepository.remove(functionary);
}

const validateData = (functionary) => {
    if (!functionary.idCard || 
        !functionary.name || 
        !functionary.lastName || 
        !functionary.email || 
        !functionary.phone || 
        !functionary.dependenceDbId) {
        throw new Error("Datos incorrectos");
    }
}

const validateFunctionary = (functionary) => {
    if(!functionary) {
        throw new Error("functionario no encontrado");
    }
}

export default { create, read, searchById, edit, remove };