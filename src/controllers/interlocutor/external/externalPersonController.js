import externalPersonService from "../../../services/interlocutor/external/externalPersonService.js";
import { ExternalPersonReqModel, ExternalPersonResModel } from "../../../models/interlocutor/external/externalPersonModel.js";
import resHttp from "../../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const externalPerson = new ExternalPersonReqModel(req.body);
        const message = await externalPersonService.create(externalPerson, req.user.sub);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "No es posible crear la persona externa", error, 400);
    }
}

const read = async (req, res) => {
    try {
        const array = await externalPersonService.read(req.user.sub)
        const externalPersons = [];
        array.forEach(externalPerson => externalPersons.push(new ExternalPersonResModel(externalPerson)));
        resHttp.success(res, externalPersons, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los estudiantes", error, 500);
    }
}

const searchById = async (req, res) => {
    try {
        const externalPerson = await externalPersonService.searchById(req.params.id, req.user.sub);
        resHttp.success(res, new ExternalPersonResModel(externalPerson), 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer la persona externa", error, 400);
    }
}

const edit = async (req, res) => {
    try {
        const externalPerson = new ExternalPersonReqModel(req.body);
        const message = await externalPersonService.edit(req.params.id, externalPerson, req.user.sub);
        resHttp.success(res, message, 200);
    } catch (error) {
        resHttp.error(res, "No es posible actualizar la persona externa", error, 400);
    }
}

const remove = async (req, res) => {
    try {
        await externalPersonService.remove(req.params.id, req.user.sub);
        resHttp.success(res, "", 200);
    } catch (error) {
        resHttp.error(res, "No es posible eliminar la persona externa", error, 400);
    }
}

export default { create, read, searchById, edit, remove };