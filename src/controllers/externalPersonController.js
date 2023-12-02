import externalPersonService from "../services/externalPersonService.js";
import { ExternalPersonRequestModel, ExternalPersonResponseModel } from "../models/externalPersonModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        if(!request.user.error) {

            const externalPerson = new ExternalPersonRequestModel(request.body);
            const message = await externalPersonService.create(externalPerson, request.user.sub);

            responseHttp.success(response, message, 201);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible crear la persona externa", error, 400);
    }
}

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await externalPersonService.read(request.user.sub)

            const externalPersons = [];
    
            array.forEach(externalPerson => {
                externalPersons.push(new ExternalPersonResponseModel(externalPerson));
            });
    
            responseHttp.success(response, externalPersons, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los estudiantes", error, 500);
    }
}

const searchById = async (request, response) => {
    try {

        if(!request.user.error) {

            const externalPerson = await externalPersonService.searchById(request.params.id, request.user.sub);

            responseHttp.success(response, new ExternalPersonResponseModel(externalPerson), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer la persona externa", error, 400);
    }
}

const edit = async (request, response) => {
    try {

        if(!request.user.error) {

            const externalPerson = new ExternalPersonRequestModel(request.body);
            const message = await externalPersonService.edit(request.params.id, externalPerson, request.user.sub);

            responseHttp.success(response, message, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible actualizar la persona externa", error, 400);
    }
}

const remove = async (request, response) => {
    try {

        if(!request.user.error) {

            await externalPersonService.remove(request.params.id, request.user.sub);
            responseHttp.success(response, "", 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible eliminar la persona externa", error, 400);
    }
}

export default { create, read, searchById, edit, remove };