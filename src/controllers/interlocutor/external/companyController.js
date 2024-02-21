import companyService from "../../../services/interlocutor/external/companyService.js";
import { CompanyReqModel, CompanyResModel } from "../../../models/interlocutor/external/companyModel.js";
import resHttp from "../../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const company = new CompanyReqModel(req.body);
        const message = await companyService.create(company, req.user.sub);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "No es posible crear la empresa", error, 400);
    }
}

const read = async (req, res) => {
    try {
        const array = await companyService.read(req.user.sub)
        const companies = [];
        array.forEach(company => companies.push(new CompanyResModel(company)));
        resHttp.success(res, companies, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer las empresas", error, 500);
    }
}

const searchById = async (req, res) => {
    try {
        const company = await companyService.searchById(req.params.id, req.user.sub);
        resHttp.success(res, new CompanyResModel(company), 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer la empresa", error, 400);
    }
}

const edit = async (req, res) => {
    try {
        const company = new CompanyReqModel(req.body);
        const message = await companyService.edit(req.params.id, company, req.user.sub);
        resHttp.success(res, message, 200);
    } catch (error) {
        resHttp.error(res, "No es posible actualizar la empresa", error, 400);
    }
}

const remove = async (req, res) => {
    try {
        await companyService.remove(req.params.id, req.user.sub);
        resHttp.success(res, "", 200);
    } catch (error) {
        resHttp.error(res, "No es posible eliminar la empresa", error, 400);
    }
}

export default { create, read, searchById, edit, remove };