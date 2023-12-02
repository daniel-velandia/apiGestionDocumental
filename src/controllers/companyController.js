import companyService from "../services/companyService.js";
import { CompanyRequestModel, CompanyResponseModel } from "../models/companyModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        if(!request.user.error) {

            const company = new CompanyRequestModel(request.body);
            const message = await companyService.create(company, request.user.sub);

            responseHttp.success(response, message, 201);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible crear la empresa", error, 400);
    }
}

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await companyService.read(request.user.sub)

            const companies = [];
    
            array.forEach(company => {
                companies.push(new CompanyResponseModel(company));
            });
    
            responseHttp.success(response, companies, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer las empresas", error, 500);
    }
}

const searchById = async (request, response) => {
    try {

        if(!request.user.error) {

            const company = await companyService.searchById(request.params.id, request.user.sub);

            responseHttp.success(response, new CompanyResponseModel(company), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer la empresa", error, 400);
    }
}

const edit = async (request, response) => {
    try {

        if(!request.user.error) {

            const company = new CompanyRequestModel(request.body);
            const message = await companyService.edit(request.params.id, company, request.user.sub);

            responseHttp.success(response, message, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible actualizar la empresa", error, 400);
    }
}

const remove = async (request, response) => {
    try {

        if(!request.user.error) {

            await companyService.remove(request.params.id, request.user.sub);
            responseHttp.success(response, "", 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible eliminar la empresa", error, 400);
    }
}

export default { create, read, searchById, edit, remove };