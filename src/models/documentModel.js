import { CompanyResponseModel } from "./companyModel.js";
import { ExternalPersonResponseModel } from "./externalPersonModel.js";
import { FunctionaryResponseModel } from "./functionaryModel.js";
import { StudentResponseModel } from "./studentModel.js";

class DocumentRequestModel {
    constructor(document) {
        this.name = document.name;
        this.fileNumber = document.fileNumber;
        this.typeFile = document.typeFile;
        this.file = document.file;
        this.documentType = document.documentType;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requiresResponse = document.requiresResponse;
        this.senderType = document.senderType;
        this.sender = document.sender;
        this.addresseeType = document.addresseeType;
        this.addressee = document.addressee;
        this.documentReplied = document.documentReplied;
        this.informAddressee = document.informAddressee;
    }
}

class DocumentResponseModel {
    constructor(document) {
        this.documentId = document.documentId;
        this.dateCreated = document.dateCreated;
        this.size = document.size;
        this.name = document.name;
        this.fileNumber = document.fileNumber;
        this.typeFile = document.typeFile;
        this.file = document.file;
        this.documentType = document.documentType;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requiresResponse = document.requiresResponse;
        this.senderType = document.senderType;
        this.sender = this.fetchEntity(document.senderType, document.sender);
        this.addresseeType = document.addresseeType;
        this.addressee = this.fetchEntity(document.addresseeType, document.addressee);
        this.documentReplied = new DocumentResponseModel(document.documentReplied);
        this.informAddressee = document.informAddressee;
    }

    fetchEntity(typeEntity, id) {
        let entity = {};
    
        switch (typeEntity) {
            case "student":
                entity = new StudentResponseModel(id);
                break;
            case "company":
                entity = new CompanyResponseModel(id);
                break;
            case "externalPerson":
                entity = new ExternalPersonResponseModel(id);
                break;
            case "functionary":
                entity = new FunctionaryResponseModel(id);
                break;
        }
    
        return entity;
    }
}

export { DocumentRequestModel, DocumentResponseModel};