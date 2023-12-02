import functionaryService from "../services/functionaryService.js";
import { FunctionaryRequestModel, FunctionaryResponseModel } from "../models/functionaryModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        if(!request.user.error) {

            const funcionary = new FunctionaryRequestModel(request.body);
            const message = await functionaryService.create(funcionary, request.user.sub);

            responseHttp.success(response, message, 201);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible crear el funcionario", error, 400);
    }
}

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await functionaryService.read(request.user.sub)

            const functionaries = [];
    
            array.forEach(functionary => {
                functionaries.push(new FunctionaryResponseModel(functionary));
            });
    
            responseHttp.success(response, functionaries, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los funcionarios", error, 500);
    }
}

const searchById = async (request, response) => {
    try {

        if(!request.user.error) {

            const functionary = await functionaryService.searchById(request.params.id, request.user.sub);

            responseHttp.success(response, new FunctionaryResponseModel(functionary), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer el funcionario", error, 400);
    }
}

const edit = async (request, response) => {
    try {

        if(!request.user.error) {

            const functionary = new FunctionaryRequestModel(request.body);
            const message = await functionaryService.edit(request.params.id, functionary, request.user.sub);

            responseHttp.success(response, message, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible actualizar el funcionario", error, 400);
    }
}

const remove = async (request, response) => {
    try {

        if(!request.user.error) {

            await functionaryService.remove(request.params.id, request.user.sub);
            responseHttp.success(response, "", 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible eliminar el funcionario", error, 400);
    }
}

export default { create, read, searchById, edit, remove };