var array = [];

const create = (functionary) => {
    array.push(functionary);
}

const read = (userId) => {
    return array.filter(functionary => functionary.user.userId === userId);
}

const searchById = (id) => {
    const functionary = array.find(functionary => functionary.functionaryId === id);

    return functionary ? functionary : null;
}

const edit = (functionary) => {
    const index = array.findIndex(currentFunctionary => currentFunctionary.functionaryId === functionary.functionaryId);

    if(index != -1) {
        array[index] = functionary;
        return array[index];
    } else {
        return null;
    }
}

const remove = (id) => {
    const index = array.findIndex(functionary => functionary.functionaryId === id);

    if(index != -1) {
        array.splice(index, 1);
    }
}

export default { create, read, searchById, edit, remove };