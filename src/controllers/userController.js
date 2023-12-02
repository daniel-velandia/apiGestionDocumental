import userService from "../services/userService.js";
import { UserRequestModel, UserResponseModel } from "../models/UserModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        const user = new UserRequestModel(request.body);
        const message = await userService.create(user);

        responseHttp.success(response, message, 201);
        
    } catch (error) {
        responseHttp.error(response, "Error al crear usuario", error, 400);
    }
}

const searchByUsername = async (request, response) => {
    try {

        if(!request.user.error) {

            const user = await userService.searchByUsername(request.user.sub);
            responseHttp.success(response, new UserResponseModel(user), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "Error al leer usuario", error, 500);
    }
}

const signin = async (request, response) => {
    
    if(!request.user.error) {
        responseHttp.signin(request, response, 200);
    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, searchByUsername, signin };