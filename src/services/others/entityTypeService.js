import entityTypeRepository from "../../repositories/others/entityTypeRepository.js";
import { entityTypes } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await entityTypeRepository.isEmpty();

    if(isEmpty) {
        for (const type of entityTypes) {
            entityTypeRepository.create(type);
        }
    }
}

const read = async () => {
    return await entityTypeRepository.read();
}

const searchByType = async (type) => {
    return await entityTypeRepository.searchByType(type);
}

export default { create, read, searchByType };