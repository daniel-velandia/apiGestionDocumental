import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const create = (user) => {
    return new Promise((resolve, reject) => {

        if(!user.username || 
           !user.email || 
           !user.password) {

            reject("Datos incorrectos");
            return;
        }

        if(userRepository.searchByEmail(user.email) !== null) {
            reject("El correo ya se encuentra registrado");
            return;
        }

        if(userRepository.searchByUsername(user.username) !== null) {
            reject("El nombre de usuario ya se encuentra registrado");
            return;
        }

        user.userId = crypto.randomUUID();
        user.encryptedPassword = bcrypt.hashSync(user.password, 10);

        userRepository.create(user);

        resolve("Usuario creado con exito");

    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {

        const user = userRepository.searchByUsername(username);

        if(user === null) {
            reject("Usuario no encontrado");
            return;
        }

        resolve(user);

    });
}

export default { create, read };