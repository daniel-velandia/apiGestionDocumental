import studentRepository from "../../../repositories/interlocutor/internal/studentRepository.js";
import userService from "../../user/userService.js";
import interlocutorTypeService from "../../data/interlocutorTypeService.js";
import careerService from "../../data/careerService.js";
import crypto from "crypto";
import { StudentEntityModel } from "../../../models/interlocutor/internal/studentModel.js";

const create = async (student, username) => {
    validateData(student);

    const user = await userService.searchByUsername(username);
    const interlocutorType = await interlocutorTypeService.searchTypeStudent();

    await careerService.validate(student.studyData.careerDbId);
    
    student.interlocutorId = crypto.randomUUID();
    student.interlocutorTypeDbId = interlocutorType.id;
    student.userDbId = user.id;
    student.studyData.createdDate = new Date();
    
    await studentRepository.create(student);

    return "Estudiante creado con exito";
}

const read = async (username) => {
    const students = [];
    const user = await userService.searchByUsername(username);
    const array = await studentRepository.read(user.id);
    array.forEach(student => students.push(new StudentEntityModel(student)));
    
    return students;
}

const searchById = async (interlocutorId, username) => {
    const user = await userService.searchByUsername(username);
    const student = await studentRepository.searchById(interlocutorId, user.id);
    validateStudent(student);

    return new StudentEntityModel(student);
}

const searchByIdAndDate = async (interlocutorId, username, date) => {
    const user = await userService.searchByUsername(username);
    const student = await studentRepository.searchByIdAndDate(interlocutorId, user.id, date);
    validateStudent(student);

    return new StudentEntityModel(student);
} 

const edit = async (interlocutorId, student, username) => {
    validateData(student);

    const user = await userService.searchByUsername(username);
    const currentStudent = await searchById(interlocutorId, username);

    validateStudent(currentStudent);

    await careerService.validate(student.studyData.careerDbId);

    const isStudyDataChanged = 
        JSON.stringify(currentStudent.studyData) !== 
        JSON.stringify(student.studyData);

    currentStudent.idCard = student.idCard;
    currentStudent.name = student.name;
    currentStudent.lastName = student.lastName;
    currentStudent.email = student.email;
    currentStudent.phone = student.phone;
    currentStudent.studyData = student.studyData;
    currentStudent.studyData.createdDate = new Date();

    console.log(currentStudent)

    await studentRepository.edit(currentStudent, isStudyDataChanged);

    return "Estudiante actualizado con exito";
}

const remove = async (interlocutorId, username) => {
    const student = await searchById(interlocutorId, username);
    validateStudent(student);

    await studentRepository.remove(student);
}


const validateData = (student) => {
    if (!student.idCard || 
        !student.name || 
        !student.lastName || 
        !student.email || 
        !student.phone || 
        !student.studyData) {
        throw new Error("Datos incorrectos");
    }
}

const validateStudent = (student) => {
    if(!student) {
        throw new Error("Estudiante no encontrado");
    }
}

export default { create, read, searchById, searchByIdAndDate, edit, remove };