class CompanyReqModel {
    constructor(company) {
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addresseeName;
    }
}

class CompanyResModel {
    constructor(company) {
        this.interlocutorId = company.interlocutorId;
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addresseeName;
    }
}

class CompanyEntityModel {
    constructor(company) {
        this.id = company.id;
        this.interlocutorDbId = company.interlocutor_db_id;
        this.interlocutorId = company.interlocutor_id;
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addressee_name;
        this.type = company.type;
    }
}

export { CompanyReqModel, CompanyResModel, CompanyEntityModel };