class ExternalPersonReqModel {
    constructor(externalPerson) {
        this.idCard = externalPerson.idCard;
        this.name = externalPerson.name;
        this.lastName = externalPerson.lastName;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
    }
}

class ExternalPersonResModel {
    constructor(externalPerson) {
        this.interlocutorId = externalPerson.interlocutorId;
        this.idCard = externalPerson.idCard;
        this.name = externalPerson.name;
        this.lastName = externalPerson.lastName;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
    }
}

class ExternalPersonEntityModel {
    constructor(externalPerson) {
        this.id = externalPerson.id;
        this.interlocutorDbId = externalPerson.interlocutor_db_id;
        this.personDbId = externalPerson.person_db_id;
        this.interlocutorId = externalPerson.interlocutor_id;
        this.idCard = externalPerson.id_card;
        this.name = externalPerson.name;
        this.lastName = externalPerson.last_name;
        this.email = externalPerson.email;
        this.phone = externalPerson.phone;
        this.address = externalPerson.address;
        this.type = externalPerson.type;
    }
}

export { ExternalPersonReqModel, ExternalPersonResModel, ExternalPersonEntityModel };