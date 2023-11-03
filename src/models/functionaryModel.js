class FunctionaryRequestModel {
    constructor(functionary) {
        this.idCard = functionary.idCard;
        this.name = functionary.name;
        this.lastName = functionary.lastName;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.dependence = functionary.dependence;
    }
}

class FunctionaryResponseModel {
    constructor(functionary) {
        this.functionaryId = functionary.functionaryId;
        this.idCard = functionary.idCard;
        this.name = functionary.name;
        this.lastName = functionary.lastName;
        this.email = functionary.email;
        this.phone = functionary.phone;
        this.dependence = functionary.dependence;
    }
}

export { FunctionaryRequestModel, FunctionaryResponseModel };