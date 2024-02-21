import { interlocutorTypes } from "../../utils/constants.js";
import { CompanyResModel } from "../interlocutor/external/companyModel.js";
import { InterlocutorReqModel } from "../interlocutor/interlocutorModel.js";
import { ExternalPersonResModel } from "../interlocutor/external/externalPersonModel.js";
import { FunctionaryResModel } from "../interlocutor/internal/functionaryModel.js";
import { DataEntityModel, DataResModel } from "../data/dataModel.js";
import { StudentResModel } from "../interlocutor/internal/studentModel.js";

class DocumentReqModel {
    constructor(document) {
        this.name = document.name;
        this.fileNumber = document.fileNumber;
        this.typeFile = document.typeFile;
        this.file = document.file;
        this.documentTypeDbId = document.documentTypeDbId;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requireResponse = document.requireResponse;
        this.receivedId = document.receivedId;
        this.sender = new InterlocutorReqModel(document.sender);
        this.addressee = new InterlocutorReqModel(document.addressee);
    }
}

class DocumentResModel {
    constructor(document) {
        this.documentId = document.documentId;
        this.name = document.name;
        this.fileNumber = document.fileNumber;
        this.typeFile = document.typeFile;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requireResponse = document.requireResponse;
        this.size = document.size;
        this.createdDate = document.createdDate;
        this.documentType = new DataResModel(document.documentType);
        if(document.sender)
            this.sender = interlocutorMapper(document.sender);
        if(document.addressee)
            this.addressee = interlocutorMapper(document.addressee);
        if(document.documentReceived)
            this.documentReceived = new DocumentResModel(document.documentReceived);
    }
}

const interlocutorMapper = (interlocutor) => {
    const interlocutorConstructors = {
        [interlocutorTypes.student]: StudentResModel,
        [interlocutorTypes.functionary]: FunctionaryResModel,
        [interlocutorTypes.externalPerson]: ExternalPersonResModel,
        [interlocutorTypes.company]: CompanyResModel,
    };

    const InterlocutorResModel = interlocutorConstructors[interlocutor.type];
    return InterlocutorResModel ? new InterlocutorResModel(interlocutor) : {};
}

class DocumentEntityModel {
    constructor(document) {
        this.id = document.id;
        this.documentId = document.document_id;
        this.name = document.name;
        this.fileNumber = document.file_number;
        this.typeFile = document.type_file == 1;
        this.subject = document.subject;
        this.annexes = document.annexes;
        this.requireResponse = document.require_response == 1;
        this.size = document.size;
        this.createdDate = document.created_date;
        this.documentReceived = document.document_received;
        this.sender = document.sender;
        this.addressee = document.addressee;
        this.documentType = new DataEntityModel(
            document.document_type_db_id, 
            document.document_type_name
        );
    }
}

class FileResModel {
    constructor(file) {
        this.file = file;
    }
}

export { DocumentReqModel, DocumentResModel, DocumentEntityModel, FileResModel };