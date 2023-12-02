class FunctionaryRequestModel {
    constructor(functionary) {
        this.idCard = functionary.idCard;
        this.name = functionary.name;
        this.lastName = functionary.lastName;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.dependenceId = functionary.dependenceId;
    }
}

class FunctionaryResponseModel {
    constructor(functionary) {
        this.entityId = functionary.entity_id;
        this.idCard = functionary.id_card;
        this.name = functionary.name;
        this.lastName = functionary.last_name;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.dependence = functionary.dependence;
    }
}

export { FunctionaryRequestModel, FunctionaryResponseModel };