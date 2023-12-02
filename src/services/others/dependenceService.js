import dependenceRepository from "../../repositories/others/dependenceRepository.js";
import { dependences } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await dependenceRepository.isEmpty();

    if(isEmpty) {
        for (const dependence of dependences) {
            await dependenceRepository.create(dependence);
        }
    }
}

const read = async () => {
    return await dependenceRepository.read();
}

const searchById = async (dependenceId) => {
    return await dependenceRepository.searchById(dependenceId);
}

export default { create, read, searchById };
