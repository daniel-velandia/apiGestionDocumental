import { CompanyResponseModel } from "./companyModel.js";
import { ExternalPersonResponseModel } from "./externalPersonModel.js";
import { FunctionaryResponseModel } from "./functionaryModel.js";
import { StudentResponseModel } from "./studentModel.js";
import { entityTypes } from "../utils/constants.js";

class DocumentRequestModel {
    constructor(document) {
        this.name = document.name;
        this.fileNumber = document.fileNumber;
        this.typeFile = document.typeFile;
        this.file = document.file;
        this.size = document.size;
        this.documentTypeId = document.documentTypeId;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requiresResponse = document.requiresResponse;
        this.senderId = document.senderId;
        this.addresseeId = document.addresseeId;
        this.documentReceivedId = document.documentReceivedId;
    }
}

class DocumentResponseModel {
    constructor(document) {
        this.documentId = document.document_id;
        this.createdDate = document.created_date;
        this.size = document.size;
        this.name = document.name;
        this.fileNumber = document.file_number;
        this.typeFile = document.type_file == 1;
        this.documentType = document.type;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requiresResponse = document.requires_response == 1;
        this.sender = entityModelMapper(document.sender);
        this.addressee = entityModelMapper(document.addressee);
        this.documentReceived = document.documentReceived ? new DocumentResponseModel(document.documentReceived) : null;
    }
}

const entityModelMapper = (entity) => {
    if(!entity) { return null; }

    switch (entity.type) {
        case entityTypes[0]:
            return new StudentResponseModel(entity);
        case entityTypes[1]:
            return new FunctionaryResponseModel(entity);
        case entityTypes[2]:
            return new ExternalPersonResponseModel(entity);
        case entityTypes[3]:
            return new CompanyResponseModel(entity);
    }
}

export { DocumentRequestModel, DocumentResponseModel};