import documentTypeRepository from "../../repositories/data/documentTypeRepository.js";
import { documentTypes } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await documentTypeRepository.isEmpty();

    if(isEmpty) {
        for (const key in documentTypes) {
            if (Object.hasOwnProperty.call(documentTypes, key)) {
                await documentTypeRepository.create(documentTypes[key]);
            }
        }
    }
}

const read = async () => {
    return await documentTypeRepository.read();
}

const validate = async (id) => {
    const documentType = await documentTypeRepository.searchById(id);
    if(!documentType) {
        throw new Error("Tipo de documento invalido");
    }
}

export default { create, read, validate };
