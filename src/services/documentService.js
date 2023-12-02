import documentReceivedDispatchedRepository from "../repositories/intermediaries/documentReceivedDispatchedRepository.js";
import documentRepository from "../repositories/documentRepository.js";
import documentTypeRepository from "../repositories/others/documentTypeRepository.js";
import fileRepository from "../repositories/file/fileRepository.js";
import userRepository from "../repositories/userRepository.js";
import entityService from "../services/parents/entityService.js";
import crypto from "crypto";
import { validateDocumentData, validateDocumentReceived, validateEntityExistence } from "../utils/validator.js";
import { documentDataMapper } from "../utils/mapper.js";

const create = async (document, username) => {
    validateDocumentData(document);

    const user = await userRepository.searchByUsername(username);
    const documentType = await documentTypeRepository.searchById(document.documentTypeId);
    const documentReceived = await documentRepository.searchById(document.documentReceivedId, user.id);
    const sender = await entityService.searchById(document.senderId, user.id);
    const addressee = await entityService.searchById(document.addresseeId, user.id);

    validateEntityExistence(sender, "Remitente no encontrado");
    validateEntityExistence(addressee, "Destinatario no encontrado");
    validateEntityExistence(documentType, "Tipo de documento incorrecto")
    validateDocumentReceived(document.typeFile, documentReceived);
    
    document.documentId = crypto.randomUUID();
    document.userId = user.id;
    document.size = 23423;
    document.documentTypeId = documentType.id;
    document.senderId = sender.id;
    document.addresseeId = addressee.id;

    const fileId = await fileRepository.create(document.file);
    await documentRepository.create(document, fileId);

    if(!document.typeFile) {
        const documentDispatched = await documentRepository.searchById(document.documentId, user.id);
        await documentReceivedDispatchedRepository.create(documentReceived.id, documentDispatched.id);
    }

    return "documento creado con exito";
}

const read = async (username) => {
    const user = await userRepository.searchByUsername(username);
    return await documentRepository.read(user.id);
}

const searchById = async (documentId, username) => {
    const user = await userRepository.searchByUsername(username);
    const document = await documentRepository.searchById(documentId, user.id);
    validateEntityExistence(document, "Documento no encontrado");

    document.sender = await entityService.searchEntityByType(document.sender_type, document.sender_id, document.created_date, user.id);
    document.addressee = await entityService.searchEntityByType(document.addressee_type, document.addressee_id, document.created_date, user.id);
    document.documentReceived = await documentRepository.searchById(document.received_id, user.id);

    return document;
}

const searchFile = async (documentId, username) => {
    const user = await userRepository.searchByUsername(username);
    const document = await documentRepository.searchById(documentId, user.id);
    const file = await fileRepository.searchById(document.file_id);
    
    return file;
}

const search = async (params, username) => {
    const user = await userRepository.searchByUsername(username);

    const byIdCard = await documentRepository.searchByIdCard(params.query, user.id);
    const byNit = await documentRepository.searchByNit(params.query, user.id);

    const documents = byIdCard.length > 0 ? byIdCard : byNit;

    console.log(documents)
    console.log(byIdCard)
    console.log(byNit)
    return documents;
}

const edit = async (documentId, document, username) => {
    validateDocumentData(document);

    const user = await userRepository.searchByUsername(username);
    const documentType = await documentTypeRepository.searchById(document.documentTypeId);
    const documentReceived = await documentRepository.searchById(document.documentReceivedId, user.id);
    const currentDocument = await documentRepository.searchById(documentId, user.id);
    const sender = await entityService.searchById(document.senderId, user.id);
    const addressee = await entityService.searchById(document.addresseeId, user.id);

    validateEntityExistence(sender, "Remitente no encontrado");
    validateEntityExistence(addressee, "Destinatario no encontrado");
    validateEntityExistence(documentType, "Tipo de documento incorrecto")
    validateDocumentReceived(document.typeFile, documentReceived);
    validateEntityExistence(currentDocument, "No se puede realizar esta acción");
    documentDataMapper(currentDocument, document);

    await documentRepository.edit(currentDocument);
    await fileRepository.edit(currentDocument.file, currentDocument.file_id);

    if(!document.typeFile) {
        await documentReceivedDispatchedRepository.edit(documentReceived.id, currentDocument.id);
    } else {
        await documentReceivedDispatchedRepository.edit(null, currentDocument.id);
    }

    return "documento creado con exito";
}

const remove = async (id, username) => {
    const user = await userRepository.searchByUsername(username);
    const document = await documentRepository.searchById(id, user.id);
    validateEntityExistence(document, "No se puede realizar esta acción");

    await documentReceivedDispatchedRepository.remove(document.document_dispatched_id)
    await fileRepository.remove(document.file_id);
}

export default { create, read, searchById, searchFile, search, edit, remove };