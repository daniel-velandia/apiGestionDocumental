import documentService from "../../services/document/documentService.js";
import { DocumentReqModel, DocumentResModel } from "../../models/document/documentModel.js";
import resHttp from "../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const document = new DocumentReqModel(req.body);
        const message = await documentService.create(document, req.user.sub);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "No es posible crear el documento", error, 400);
    }
}

const read = async (req, res) => {
    try {
        const array = await documentService.read(req.user.sub)
        const documents = [];
        array.forEach(document => documents.push(new DocumentResModel(document)));
        resHttp.success(res, documents, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los documentos", error, 500);
    }
}

const searchById = async (req, res) => {
    try {
        const document = await documentService.searchById(req.params.id, req.user.sub);
        resHttp.success(res, new DocumentResModel(document), 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer el documento", error, 400);
    }
}

// const search = async (req, res) => {
//     try {
//         const array = await documentService.search(req.query, req.user.sub);
//         const documents = [];
//         array.forEach(document => documents.push(new DocumentResModel(document)));
//         resHttp.success(res, documents, 200);
//     } catch (error) {
//         resHttp.error(res, "No es posible leer los documentos", error, 400);
//     }
// }

const edit = async (req, res) => {
    try {
        const document = new DocumentReqModel(req.body);
        const message = await documentService.edit(req.params.id, document, req.user.sub);
        resHttp.success(res, message, 200);
    } catch (error) {
        resHttp.error(res, "No es posible actualizar el documento", error, 400);
    }
}

const remove = async (req, res) => {
    try {
        await documentService.remove(req.params.id, req.user.sub);
        resHttp.success(res, "", 200);
    } catch (error) {
        resHttp.error(res, "No es posible eliminar el documento", error, 400);
    }
}

export default { create, read, searchById, edit, remove };