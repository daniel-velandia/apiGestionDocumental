import companyRepository from "../repositories/companyRepository.js";
import documentRepository from "../repositories/documentRepository.js";
import externalPersonRepository from "../repositories/externalPersonRepository.js";
import functionaryRepository from "../repositories/functionaryRepository.js";
import studentRepository from "../repositories/studentRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";

const fetchEntity = (typeEntity, id, reject) => {
    let entity = {};

    switch (typeEntity) {
        case "student":
            entity = studentRepository.searchById(id);
            break;
        case "company":
            entity = companyRepository.searchById(id);
            break;
        case "externalPerson":
            entity = externalPersonRepository.searchById(id);
            break;
        case "functionary":
            entity = functionaryRepository.searchById(id);
            break;
        default:
            reject("Error al asignar entidad")
            return;
    }

    return entity;
}

const create = (document, username) => {
    return new Promise((resolve, reject) => {
        if(!document.name || 
           !document.fileNumber || 
           !document.file || 
           !document.documentType || 
           !document.subject || 
           !document.annexes || 
           !document.senderType || 
           !document.sender || 
           !document.addresseeType || 
           !document.addressee || 
           (!document.typeFile && !document.documentReplied)) {

            reject("datos incorrectos");
            return;
        }

        const user = userRepository.searchByUsername(username);

        document.documentId = crypto.randomUUID();
        document.dateCreated = new Date();
        document.size = document.file.size;
        document.user = user;
        document.sender = fetchEntity(document.senderType, document.sender, reject);
        document.addressee = fetchEntity(document.addresseeType, document.addressee, reject);
        document.documentReplied = !document.typeFile ? documentRepository.searchById(document.documentReplied) : null;

        documentRepository.create(document);

        resolve("documento creado con exito");
    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {
        const user = userRepository.searchByUsername(username);
        resolve(documentRepository.read(user.userId));
    });
}

const detail = (id) => {
    return new Promise((resolve, reject) => {
        const document = documentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(document.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
        } else {
            resolve(document);
        }
    });
}

const edit = (id, document, username) => {
    return new Promise((resolve, reject) => {

        if(!document.name || 
           !document.fileNumber || 
           !document.file || 
           !document.documentType || 
           !document.subject || 
           !document.annexes || 
           !document.senderType || 
           !document.sender || 
           !document.addresseeType || 
           !document.addressee || 
           (!document.typeFile && !document.documentReplied)) {
 
            reject("datos incorrectos");
            return;
         }

        const currentDocument = documentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(currentDocument.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        currentDocument.name = document.name;
        currentDocument.fileNumber = document.fileNumber;
        currentDocument.typeFile = document.typeFile;
        currentDocument.file = document.file;
        currentDocument.size = document.file.size;
        currentDocument.documentType = document.documentType;
        currentDocument.subject = document.subject;
        currentDocument.annexes = document.annexes;
        currentDocument.requiresResponse = document.requiresResponse;
        currentDocument.senderType = document.senderType;
        currentDocument.sender = document.sender;
        currentDocument.addresseeType = document.addresseeType;
        currentDocument.addressee = document.addressee;
        currentDocument.documentReplied = document.documentReplied;
        currentDocument.informAddressee = document.informAddressee;
        currentDocument.sender = fetchEntity(document.senderType, document.sender, reject);
        currentDocument.addressee = fetchEntity(document.addresseeType, document.addressee, reject);
        currentDocument.documentReplied = !document.typeFile ? documentRepository.searchById(document.documentReplied) : null;

        const documentEdited = documentRepository.edit(currentDocument);

        if(documentEdited !== null) {
            resolve("documento actualizado con exito");
        } else {
            reject("Error al actualizar documento");
        }

    });
}

const remove = (id, username) => {
    return new Promise((resolve, reject) => {
        
        const document = documentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(document.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        documentRepository.remove(document.documentId);

        resolve();
    });
}

export default { create, read, detail, edit, remove };