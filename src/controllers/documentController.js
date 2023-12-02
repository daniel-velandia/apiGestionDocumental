import documentService from "../services/documentService.js";
import { DocumentRequestModel, DocumentResponseModel } from "../models/documentModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        if(!request.user.error) {

            const document = new DocumentRequestModel(request.body);
            const message = await documentService.create(document, request.user.sub);

            responseHttp.success(response, message, 201);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible crear el documento", error, 400);
    }
}

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await documentService.read(request.user.sub)

            const documents = [];
    
            array.forEach(document => {
                documents.push(new DocumentResponseModel(document));
            });
    
            responseHttp.success(response, documents, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los documentos", error, 500);
    }
}

const searchById = async (request, response) => {
    try {

        if(!request.user.error) {
            
            const document = await documentService.searchById(request.params.id, request.user.sub);

            responseHttp.success(response, new DocumentResponseModel(document), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer el documento", error, 400);
    }
}

const searchFile = async (request, response) => {
    try {

        if(!request.user.error) {

            const file = await documentService.searchFile(request.params.id, request.user.sub);

            responseHttp.success(response, file, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer el archivo", error, 400);
    }
}

const search = async (request, response) => {
    try {

        if(!request.user.error) {
            
            const array = await documentService.search(request.query, request.user.sub);

            const documents = [];
    
            array.forEach(document => {
                documents.push(new DocumentResponseModel(document));
            });

            responseHttp.success(response, documents, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los documentos", error, 400);
    }
}

const edit = async (request, response) => {
    try {

        if(!request.user.error) {

            const document = new DocumentRequestModel(request.body);
            const message = await documentService.edit(request.params.id, document, request.user.sub);

            responseHttp.success(response, message, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible actualizar el documento", error, 400);
    }
}

const remove = async (request, response) => {
    try {

        if(!request.user.error) {

            await documentService.remove(request.params.id, request.user.sub);
            responseHttp.success(response, "", 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible eliminar el documento", error, 400);
    }
}

export default { create, read, searchById, searchFile, search, edit, remove };