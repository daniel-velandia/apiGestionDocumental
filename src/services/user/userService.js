import userRepository from "../../repositories/user/userRepository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserEntityModel } from "../../models/user/userModel.js";

const create = async (user) => {
    if (!user.username || !user.email || !user.password) {
        throw new Error("datos incorrectos");
    }

    const userByEmail = await userRepository.searchByEmail(user.email);
    if (userByEmail) {
        throw new Error("El correo ya se encuentra registrado");
    }

    const userByUsername = await userRepository.searchByUsername(user.username);
    if (userByUsername) {
        throw new Error("El nombre de usuario ya se encuentra registrado");
    }

    user.userId = crypto.randomUUID();
    user.encryptedPassword = bcrypt.hashSync(user.password, 10);

    await userRepository.create(user);

    return "Usuario creado con exito";
}

const searchByUsername = async (username) => {
    const user = await userRepository.searchByUsername(username);
    if(!user) {
        throw new Error("Usuario no encontrado");
    }

    return new UserEntityModel(user);
}

export default { create, searchByUsername };