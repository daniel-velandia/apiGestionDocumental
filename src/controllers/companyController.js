import companyService from "../services/companyService.js";
import { CompanyRequestModel, CompanyResponseModel } from "../models/companyModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    if(!request.user.error) {

        companyService.create(new CompanyRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 201);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible crear la empresa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const read = (request, response) => {

    if(!request.user.error) {

        companyService.read(request.user.sub)
        .then(array => {
    
            const companies = [];
    
            array.forEach(company => {
                companies.push(new CompanyResponseModel(company));
            });
    
            responseHttp.success(response, companies, 200);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible leer las empresas", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const detail = (request, response) => {

    if(!request.user.error) {

        companyService.detail(request.params.id, request.user.sub)
        .then(company => {
            responseHttp.success(response, new CompanyResponseModel(company), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer la empresa", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const edit = (request, response) => {

    if(!request.user.error) {

        companyService.edit(request.params.id, new CompanyRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al actualizar la empresa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const remove = (request, response) => {
    
    if(!request.user.error) {

        companyService.remove(request.params.id, request.user.sub)
        .then(() => {
            responseHttp.success(response, "Empresa eliminada con exito", 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al eliminar la empresa", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, detail, edit, remove };