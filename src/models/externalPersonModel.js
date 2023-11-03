class ExternalPersonRequestModel {
    constructor(externalPerson) {
        this.idCard = externalPerson.idCard;
        this.name = externalPerson.name;
        this.lastName = externalPerson.lastName;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
    }
}

class ExternalPersonResponseModel {
    constructor(externalPerson) {
        this.externalPersonId = externalPerson.externalPersonId;
        this.idCard = externalPerson.idCard;
        this.name = externalPerson.name;
        this.lastName = externalPerson.lastName;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
    }
}

export { ExternalPersonRequestModel, ExternalPersonResponseModel };