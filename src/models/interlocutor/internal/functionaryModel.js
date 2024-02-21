import { DataEntityModel, DataResModel } from "../../data/dataModel.js";

class FunctionaryReqModel {
    constructor(functionary) {
        this.idCard = functionary.idCard;
        this.name = functionary.name;
        this.lastName = functionary.lastName;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.dependenceDbId = functionary.dependenceDbId;
    }
}

class FunctionaryResModel {
    constructor(functionary) {
        this.interlocutorId = functionary.interlocutorId;
        this.idCard = functionary.idCard;
        this.name = functionary.name;
        this.lastName = functionary.lastName;
        this.email = functionary.email;
        this.phone = functionary.phone;
        if(functionary.dependence)
            this.dependence = new DataResModel(functionary.dependence);
    }
}

class FunctionaryEntityModel {
    constructor(functionary) {
        this.id = functionary.id;
        this.interlocutorDbId = functionary.interlocutor_db_id;
        this.personDbId = functionary.person_db_id;
        this.interlocutorId = functionary.interlocutor_id;
        this.idCard = functionary.id_card;
        this.name = functionary.name;
        this.lastName = functionary.last_name;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.type = functionary.type;
        if(functionary.dependence_db_id)
            this.dependence = new DataEntityModel(
                functionary.dependence_db_id,
                functionary.dependency_name
            );
    }
}

export { FunctionaryReqModel, FunctionaryResModel, FunctionaryEntityModel };