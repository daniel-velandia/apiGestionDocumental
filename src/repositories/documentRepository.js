var array = [];

const create = (document) => {
    array.push(document);
}

const read = (userId) => {
    return array.filter(document => document.user.userId === userId);
}

const searchById = (id) => {
    const document = array.find(document => document.documentId === id);

    return document ? document : null;
}

const edit = (document) => {
    const index = array.findIndex(currentDocument => currentDocument.documentId === document.documentId);

    if(index != -1) {
        array[index] = document;
        return true;
    } else {
        return false;
    }
}

const remove = (id) => {
    const index = array.findIndex(document => document.documentId === id);

    if(index != -1) {
        array.splice(index, 1);
    }
}

export default { create, read, searchById, edit, remove };