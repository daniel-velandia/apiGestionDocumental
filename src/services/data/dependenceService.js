import dependenceRepository from "../../repositories/data/dependenceRepository.js";
import { dependences } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await dependenceRepository.isEmpty();

    if(isEmpty) {
        for (const key in dependences) {
            if (Object.hasOwnProperty.call(dependences, key)) {
                await dependenceRepository.create(dependences[key]);
            }
        }
    }
}

const read = async () => {
    return await dependenceRepository.read();
}

const validate = async (id) => {
    const dependence = await dependenceRepository.searchById(id);
    if(!dependence) {
        throw new Error("Dependencia invalida");
    }
}

export default { create, read, validate };
