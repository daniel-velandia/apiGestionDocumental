var array = [];

const create = (student) => {
    array.push(student);
}

const read = (userId) => {
    return array.filter(student => student.user.userId === userId);
}

const searchById = (id) => {
    const student = array.find(student => student.studentId === id);

    return student ? student : null;
}

const edit = (student) => {
    const index = array.findIndex(currentStudent => currentStudent.studentId === student.studentId);

    if(index != -1) {
        array[index] = student;
        return array[index];
    } else {
        return null;
    }
}

const remove = (id) => {
    const index = array.findIndex(student => student.studentId === id);

    if(index != -1) {
        array.splice(index, 1);
    }
}

export default { create, read, searchById, edit, remove };