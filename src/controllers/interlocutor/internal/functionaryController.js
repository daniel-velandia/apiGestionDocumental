import functionaryService from "../../../services/interlocutor/internal/functionaryService.js";
import { FunctionaryReqModel, FunctionaryResModel } from "../../../models/interlocutor/internal/functionaryModel.js";
import resHttp from "../../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const functionary = new FunctionaryReqModel(req.body);
        const message = await functionaryService.create(functionary, req.user.sub);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "No es posible crear el funcionario", error, 400);
    }
}

const read = async (req, res) => {
    try {
        const array = await functionaryService.read(req.user.sub)
        const functionaries = [];
        array.forEach(functionary => functionaries.push(new FunctionaryResModel(functionary)));
        resHttp.success(res, functionaries, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los funcionarios", error, 500);
    }
}

const searchById = async (req, res) => {
    try {
        const functionary = await functionaryService.searchById(req.params.id, req.user.sub);
        resHttp.success(res, new FunctionaryResModel(functionary), 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer el funcionario", error, 400);
    }
}

const edit = async (req, res) => {
    try {
        const functionary = new FunctionaryReqModel(req.body);
        const message = await functionaryService.edit(req.params.id, functionary, req.user.sub);
        resHttp.success(res, message, 200);
    } catch (error) {
        resHttp.error(res, "No es posible actualizar el funcionario", error, 400);
    }
}

const remove = async (req, res) => {
    try {
        await functionaryService.remove(req.params.id, req.user.sub);
        resHttp.success(res, "", 200);
    } catch (error) {
        resHttp.error(res, "No es posible eliminar el funcionario", error, 400);
    }
}

export default { create, read, searchById, edit, remove };