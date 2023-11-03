var array = [];

const create = (company) => {
    array.push(company);
}

const read = (userId) => {
    return array.filter(company => company.user.userId === userId);
}

const searchById = (id) => {
    const company = array.find(company => company.companyId === id);

    return company ? company : null;
}

const edit = (company) => {
    const index = array.findIndex(currentCompany => currentCompany.companyId === company.companyId);

    if(index != -1) {
        array[index] = company;
        return array[index];
    } else {
        return null;
    }
}

const remove = (id) => {
    const index = array.findIndex(company => company.companyId === id);

    if(index != -1) {
        array.splice(index, 1);
    }
}

export default { create, read, searchById, edit, remove };