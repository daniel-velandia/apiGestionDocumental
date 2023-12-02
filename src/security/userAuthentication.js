import LocalStrategy from "passport-local";
import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import securityConstants from "./securityConstants.js";
import jwt from "jsonwebtoken";
import { variables } from "../utils/variables.js";
import { UserResponseModel } from "../models/UserModel.js";

const createToken = (user) => {

    const payload = {
        sub: user.username,
        exp: new Date().getTime() + securityConstants.EXPIRATION_DATE
    }

    return jwt.sign(payload, variables.SECRET_TOKEN);

}

const localStrategy = new LocalStrategy({usernameField: "username", passwordField: "password"},
    async (username, password, callback) => {
        try {
            
            const user = await userService.searchByUsername(username);
            const samePassowrd = await bcrypt.compare(password, user.encrypted_password);

            if(!samePassowrd) {
                callback(null, {error: "Contraseña incorrecta"});
            } else {
                const token = createToken(user);
                callback(null, new UserResponseModel(user), token);
            }

        } catch (error) {
            callback(null, {error: "No se encuentra el usuario"});
        }
    }
);

export default { localStrategy };