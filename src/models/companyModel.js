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
        this.companyId = company.companyId;
        this.nit = company.nit;
        this.name = company.name;
        this.email = company.email;
        this.phone = company.phone;
        this.addresseeName = company.addresseeName;
    }
}

export { CompanyRequestModel, CompanyResponseModel};