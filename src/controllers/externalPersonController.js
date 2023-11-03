import externalPersonService from "../services/externalPersonService.js";
import { ExternalPersonRequestModel, ExternalPersonResponseModel } from "../models/externalPersonModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    if(!request.user.error) {
        
        externalPersonService.create(new ExternalPersonRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 201);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible crear la persona externa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const read = (request, response) => {

    if(!request.user.error) {
        
        externalPersonService.read(request.user.sub)
        .then(array => {

            const externalPersons = [];

            array.forEach(externalPerson => {
                externalPersons.push(new ExternalPersonResponseModel(externalPerson));
            });

            responseHttp.success(response, externalPersons, 200);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible leer las personas externas", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const detail = (request, response) => {

    if(!request.user.error) {
        
        externalPersonService.detail(request.params.id, request.user.sub)
        .then(externalPerson => {
            responseHttp.success(response, new ExternalPersonResponseModel(externalPerson), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer la persona externa", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const edit = (request, response) => {

    if(!request.user.error) {
        
        externalPersonService.edit(request.params.id, new ExternalPersonRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al actualizar la persona externa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const remove = (request, response) => {

    if(!request.user.error) {
        
        externalPersonService.remove(request.params.id, request.user.sub)
        .then(() => {
            responseHttp.success(response, "Persona externa eliminada con exito", 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al eliminar la persona externa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, detail, edit, remove };