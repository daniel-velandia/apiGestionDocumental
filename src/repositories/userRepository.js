const array = [];

const create = (user) => {
    array.push(user);
}

const searchByUsername = (username) => {
    const user = array.find(user => user.username === username);

    return user ? user : null;
}

const searchByEmail = (email) => {
    const user = array.find(user => user.email === email);

    return user ? user : null;
}

export default { create, searchByUsername, searchByEmail };