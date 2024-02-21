import documentRepository from "../../repositories/document/documentRepository.js";
import crypto from "crypto";
import interlocutorService from "../interlocutor/interlocutorService.js";
import userService from "../user/userService.js";
import documentTypeService from "../data/documentTypeService.js";
import { DocumentEntityModel } from "../../models/document/documentModel.js";

const create = async (document, username) => {
    validateData(document);

    const user = await userService.searchByUsername(username);
    const sender = await interlocutorService.searchByIdAndType(document.sender, username);
    const addressee = await interlocutorService.searchByIdAndType(document.addressee, username);
    const documentReceived = await searchReceivedById(document, user.id);
    
    await documentTypeService.validate(document.documentTypeDbId);
    
    document.documentId = crypto.randomUUID();
    document.userDbId = user.id;
    document.size = 23423; // while build api
    document.fileRoute = "route"; // while build api
    document.sender.id = sender.id;
    document.addressee.id = addressee.id;
    document.createdDate = new Date();
    document.receivedDbId = documentReceived ? documentReceived.id : '';

    await documentRepository.create(document);

    return "documento creado con exito";
}

const read = async (username) => {
    const documents = [];
    const user = await userRepository.searchByUsername(username);
    const array = await documentRepository.read(user.id);
    array.forEach(document => documents.push(new DocumentEntityModel(document)));

    return documents;
}

const searchById = async (documentId, username) => {
    const user = await userRepository.searchByUsername(username);
    const document = await documentRepository.searchById(documentId, user.id);

    validateDocument(document);

    document.sender = await interlocutorService.searchByIdAndType(document.sender, username, document.createDate);
    document.addressee = await interlocutorService.searchByIdAndType(document.addressee, username, document.createDate);
    document.documentReceived = await searchReceivedById(document, user.id);

    return new DocumentEntityModel(document);
}

const search = async (params, username) => {
    const user = await userRepository.searchByUsername(username);

    const byIdCard = await documentRepository.searchByIdCard(params.query, user.id);
    const byNit = await documentRepository.searchByNit(params.query, user.id);

    const documents = byIdCard.length > 0 ? byIdCard : byNit;

    return documents;
}

const edit = async (documentId, document, username) => {
    validateData(document);

    const user = await userRepository.searchByUsername(username);
    const currentDocument = await documentRepository.searchById(documentId, user.id);
    const sender = await interlocutorService.searchByIdAndType(document.sender, username);
    const addressee = await interlocutorService.searchByIdAndType(document.addressee, username);
    const documentReceived = await searchReceivedById(document, user.id);
    
    await documentTypeService.validate(document.documentTypeDbId);

    currentDocument.name = document.name;
    currentDocument.fileNumber = document.fileNumber;
    currentDocument.typeFile = document.typeFile;
    // currentDocument.file = document.file;
    currentDocument.documentTypeDbId = document.documentTypeDbId;
    currentDocument.subject = document.subject;
    currentDocument.annexes = document.annexes;
    currentDocument.requireResponse = document.requireResponse;
    currentDocument.senderDbId = sender.id;
    currentDocument.addresseeDbId = addressee.id;
    currentDocument.receivedDbId = documentReceived.id;
    
    await documentRepository.edit(currentDocument);

    return "documento actualizado con exito";
}

const remove = async (id, username) => {
    const user = await userRepository.searchByUsername(username);
    const document = await documentRepository.searchById(id, user.id);
    validateDocument(document);

    await documentRepository.remove(document);
}

const validateData = (document) => {
    if (!document.name ||
        !document.fileNumber ||
        !document.file ||
        !document.documentTypeDbId ||
        !document.subject ||
        !document.annexes ||
        !document.sender ||
        !document.addressee ||
        (!document.typeFile && 
            !document.receivedId)) {
        throw new Error("Datos incorrectos");
    }
}

const validateDocument = (document) => {
    if(!document) {
        throw new Error("Documento no encontrado");
    }
}

const searchReceivedById = async (document, userDbId) => {
    const {typeFile, receivedId} = document;
    const documentReceived = null;

    if(!typeFile && !receivedId) {
        throw new Error("Documento de despacho debe tener entrega");
    }
    
    if (typeFile && receivedId) {
        throw new Error("Documento de entrega no debe tener de despacho");
    } 
    
    if(!typeFile && receivedId) {
        documentReceived = await documentRepository.searchById(receivedId, userDbId);
        validateDocument(documentReceived);
    }

    return documentReceived;

}

export default { create, read, searchById, search, edit, remove };