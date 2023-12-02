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
        this.entityId = externalPerson.entity_id;
        this.idCard = externalPerson.id_card;
        this.name = externalPerson.name;
        this.lastName = externalPerson.last_name;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
    }
}

export { ExternalPersonRequestModel, ExternalPersonResponseModel };