import functionaryService from "../services/functionaryService.js";
import { FunctionaryRequestModel, FunctionaryResponseModel } from "../models/functionaryModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    if(!request.user.error) {
        
        functionaryService.create(new FunctionaryRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 201);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible crear el funcionario", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const read = (request, response) => {

    if(!request.user.error) {
        
        functionaryService.read(request.user.sub)
        .then(array => {

            const functionaries = [];

            array.forEach(functionary => {
                functionaries.push(new FunctionaryResponseModel(functionary));
            });

            responseHttp.success(response, functionaries, 200);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible leer los funcionarios", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const detail = (request, response) => {

    if(!request.user.error) {
        
        functionaryService.detail(request.params.id, request.user.sub)
        .then(functionary => {
            responseHttp.success(response, new FunctionaryResponseModel(functionary), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer los funcionarios", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const edit = (request, response) => {

    if(!request.user.error) {
        
        functionaryService.edit(request.params.id, new FunctionaryRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al actualizar el funcionario", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }

    
}

const remove = (request, response) => {

    if(!request.user.error) {
        
        functionaryService.remove(request.params.id, request.user.sub)
        .then(() => {
            responseHttp.success(response, "Funcionario eliminado con exito", 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al eliminar el funcionario", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, detail, edit, remove };