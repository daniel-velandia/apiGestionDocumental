import studentRepository from "../repositories/studentRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";

const create = (student, username) => {
    return new Promise((resolve, reject) => {

        if(!student.idCard || 
           !student.name || 
           !student.lastName || 
           !student.email || 
           !student.phone || 
           !student.career || 
           !student.semester) {

            reject("datos incorrectos");
            return;
        }

        const user = userRepository.searchByUsername(username);
        
        student.studentId = crypto.randomUUID();
        student.user = user;

        studentRepository.create(student);

        resolve("Estudiante creado con exito");
    });
}

const read = (username) => {
    return new Promise((resolve, reject) => {
        const user = userRepository.searchByUsername(username);
        resolve(studentRepository.read(user.userId));
    });
}

const detail = (id, username) => {
    return new Promise((resolve, reject) => {
        const student = studentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(student.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
        } else {
            resolve(student);
        }
    });
}

const edit = (id, student, username) => {
    return new Promise((resolve, reject) => {

        if(!student.idCard || 
           !student.name || 
           !student.lastName || 
           !student.email || 
           !student.phone || 
           !student.career || 
           !student.semester) {
 
            reject("datos incorrectos");
            return;
        }

        const currentStudent = studentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(currentStudent.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        currentStudent.idCard = student.idCard;
        currentStudent.name = student.name;
        currentStudent.lastName = student.lastName;
        currentStudent.email = student.email;
        currentStudent.phone = student.phone;
        currentStudent.career = student.career;
        currentStudent.semester = student.semester;

        const studentEdited = studentRepository.edit(currentStudent);

        if(studentEdited !== null) {
            resolve("Estudiante actualizado con exito");
        } else {
            reject("Error al actualizar estudiante");
        }

    });
}

const remove = (id, username) => {
    return new Promise((resolve, reject) => {
        
        const student = studentRepository.searchById(id);
        const user = userRepository.searchByUsername(username);

        if(student.user.userId !== user.userId) {
            reject("No se puede realizar esta acción");
            return;
        }

        studentRepository.remove(student.studentId);

        resolve();
    });
}

export default { create, read, detail, edit, remove };