import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { validateEntityExistence, validateUserData } from "../utils/validator.js";

const checkDuplicateEmail = async (email) => {
    const user = await userRepository.searchByEmail(email);
    if (user) {
        throw new Error("El correo ya se encuentra registrado");
    }
};

const checkDuplicateUsername = async (username) => {
    const user = await userRepository.searchByUsername(username);
    if (user) {
        throw new Error("El nombre de usuario ya se encuentra registrado");
    }
};

const create = async (user) => {
    validateUserData(user);

    await checkDuplicateEmail(user.email);
    await checkDuplicateUsername(user.username);

    user.userId = crypto.randomUUID();
    user.encryptedPassword = bcrypt.hashSync(user.password, 10);

    await userRepository.create(user);

    return "Usuario creado con exito";
}

const searchByUsername = async (username) => {
    const user = await userRepository.searchByUsername(username);
    validateEntityExistence(user, "Usuario no encontrado")

    return user;
}

export default { create, searchByUsername };