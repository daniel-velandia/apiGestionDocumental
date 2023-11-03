var array = [];

const create = (externalPerson) => {
    array.push(externalPerson);
}

const read = (userId) => {
    return array.filter(externalPerson => externalPerson.user.userId === userId);
}

const searchById = (id) => {
    const externalPerson = array.find(externalPerson => externalPerson.externalPersonId === id);

    return externalPerson ? externalPerson : null;
}

const edit = (externalPerson) => {
    const index = array.findIndex(currentExternalPerson => currentExternalPerson.externalPersonId === externalPerson.externalPersonId);

    if(index != -1) {
        array[index] = externalPerson;
        return array[index];
    } else {
        return null;
    }
}

const remove = (id) => {
    const index = array.findIndex(externalPerson => externalPerson.externalPersonId === id);

    if(index != -1) {
        array.splice(index, 1);
    }
}

export default { create, read, searchById, edit, remove };