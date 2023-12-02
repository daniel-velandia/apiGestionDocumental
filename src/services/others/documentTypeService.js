import documentTypeRepository from "../../repositories/others/documentTypeRepository.js";
import { documentTypes } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await documentTypeRepository.isEmpty();

    if(isEmpty) {
        for (const type of documentTypes) {
            await documentTypeRepository.create(type);
        }
    }
}

const read = async () => {
    return await documentTypeRepository.read();
}

const searchById = async (documentTypeId) => {
    return await documentTypeRepository.searchById(documentTypeId);
}

export default { create, read, searchById };
