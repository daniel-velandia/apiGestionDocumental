class CompanyRequestModel {
    constructor(company) {
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addresseeName;
    }
}

class CompanyResponseModel {
    constructor(company) {
        this.entityId = company.entity_id;
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addressee_name;
    }
}

export { CompanyRequestModel, CompanyResponseModel};