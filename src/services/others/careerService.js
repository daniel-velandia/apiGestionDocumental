import careerRepository from "../../repositories/others/careerRepository.js";
import { careers } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await careerRepository.isEmpty();

    if(isEmpty) {
        for (const career of careers) {
           await careerRepository.create(career);
        }
    }
}

const read = async () => {
    return await careerRepository.read();
}

const searchById = async (careerId) => {
    return await careerRepository.searchById(careerId);
}

export default { create, read, searchById };