import documentService from "../services/documentService.js";
import { DocumentRequestModel, DocumentResponseModel } from "../models/documentModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    if(!request.user.error) {
        
        documentService.create(new DocumentRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 201);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible crear el documento", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const read = (request, response) => {

    if(!request.user.error) {
        
        documentService.read(request.user.sub)
        .then(array => {

            const documents = [];

            array.forEach(document => {
                documents.push(new DocumentResponseModel(document));
            });

            responseHttp.success(response, documents, 200);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible leer los documentos", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const detail = (request, response) => {
    if(!request.user.error) {
        
        documentService.detail(request.params.id, request.user.sub)
        .then(document => {
            responseHttp.success(response, new DocumentResponseModel(document), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer el documento", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const edit = (request, response) => {

    if(!request.user.error) {
        
        documentService.edit(request.params.id, new DocumentRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al actualizar el documento", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const remove = (request, response) => {

    if(!request.user.error) {
        
        documentService.remove(request.params.id, request.user.sub)
        .then(() => {
            responseHttp.success(response, "Documento eliminado con exito", 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al eliminar el documento", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, detail, edit, remove };