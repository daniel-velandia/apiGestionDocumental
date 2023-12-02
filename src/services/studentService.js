import careerRepository from "../repositories/others/careerRepository.js";
import entityRepository from "../repositories/parents/entityRepository.js";
import entityTypeRepository from "../repositories/others/entityTypeRepository.js";
import personRepository from "../repositories/parents/personRepository.js";
import studentCareerRepository from "../repositories/intermediaries/studentCareerRepository.js";
import studentHistoryRepository from "../repositories/intermediaries/studentHistoryRepository.js";
import studentRepository from "../repositories/studentRepository.js";
import userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import { entityTypes } from "../utils/constants.js";
import { validateEntityExistence, validateStudentData } from "../utils/validator.js";
import { studentDataMapper } from "../utils/mapper.js";

const create = async (student, username) => {
    validateStudentData(student);

    const user = await userRepository.searchByUsername(username);
    const career = await careerRepository.searchById(student.careerId);
    validateEntityExistence(career, "Carrera invalida");
    
    student.entityId = crypto.randomUUID();
    student.userId = user.id;
    student.careerId = career.id;
    
    const entityType = await entityTypeRepository.searchByType(entityTypes[0]);
    const entityId = await entityRepository.create(student, entityType.id);
    const personId = await personRepository.create(student);
    const studentId = await studentRepository.create(entityId, personId);
    const studentCareerId = await studentCareerRepository.create(studentId, student.careerId);
    await studentHistoryRepository.create(studentCareerId, student.semester);

    return "Estudiante creado con exito";
}

const read = async (username) => {
    const user = await userRepository.searchByUsername(username);
    return await studentRepository.read(user.id);
}

const searchById = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const studentHistory = await studentRepository.searchById(entityId, user.id);
    const latestStudyStatus = studentHistory[studentHistory.length - 1];
    validateEntityExistence(latestStudyStatus, "Estudiante no encontrado");

    return latestStudyStatus;
}

const editStudentCareerAndHistory = async (currentStudent, newStudent) => {
    if (currentStudent.semester !== newStudent.semester || currentStudent.career_id !== newStudent.careerId) {
        currentStudent.career_id = newStudent.careerId;
        currentStudent.semester = newStudent.semester;

        const studentCareer = await studentCareerRepository.searchByIds(currentStudent.id, currentStudent.career_id);

        const studentCareerId = !studentCareer ?
            await studentCareerRepository.create(currentStudent.id, currentStudent.career_id) :
            studentCareer.id;

        await studentHistoryRepository.create(studentCareerId, currentStudent.semester);
    }
};

const edit = async (entityId, student, username) => {
    validateStudentData(student);

    const user = await userRepository.searchByUsername(username);
    const studentHistory = await studentRepository.searchById(entityId, user.id);
    const currentStudent = studentHistory[studentHistory.length - 1];

    validateEntityExistence(currentStudent, "No se puede realizar esta acción")
    studentDataMapper(currentStudent, student);

    await entityRepository.edit(currentStudent);
    await personRepository.edit(currentStudent);

    await editStudentCareerAndHistory(currentStudent, student);

    return "Estudiante actualizado con exito";
}

const remove = async (entityId, username) => {
    const user = await userRepository.searchByUsername(username);
    const studentHistory = await studentRepository.searchById(entityId, user.id);
    const currentStudent = studentHistory[studentHistory.length - 1];
    validateEntityExistence(currentStudent, "No se puede realizar esta acción");

    await entityRepository.remove(currentStudent.entity_id);
    await personRepository.remove(currentStudent.person_id);
}

export default { create, read, searchById, edit, remove };