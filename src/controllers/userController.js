import userService from "../services/userService.js";
import { UserRequestModel, UserResponseModel } from "../models/UserModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    userService.create(new UserRequestModel(request.body))
    .then(message => {
        responseHttp.success(response, message, 201);
    })
    .catch(error => {
        responseHttp.error(response, "Error al crear usuario", error, 400);
    });
}

const read = (request, response) => {

    if(!request.user.error) {
        
        userService.read(request.user.sub)
        .then(user => {
            responseHttp.success(response, new UserResponseModel(user), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer usuario", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }

}

const signin = (request, response) => {
    
    if(!request.user.error) {
        responseHttp.signin(request, response, 200);
    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, signin };