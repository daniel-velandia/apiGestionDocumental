import careerRepository from "../../repositories/data/careerRepository.js";
import { careers } from "../../utils/constants.js";

const create = async () => {
    const isEmpty = await careerRepository.isEmpty();

    if(isEmpty) {
        for (const key in careers) {
            if (Object.hasOwnProperty.call(careers, key)) {
                await careerRepository.create(careers[key]);
            }
        }
    }
}

const read = async () => {
    return await careerRepository.read();
}

const validate = async (id) => {
    const career = await careerRepository.searchById(id);
    if(!career) {
        throw new Error("Carrera invalida");
    }
}

export default { create, read, validate };