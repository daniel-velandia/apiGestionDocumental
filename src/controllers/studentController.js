import studentService from "../services/studentService.js";
import { StudentRequestModel, StudentResponseModel } from "../models/studentModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = async (request, response) => {
    try {

        if(!request.user.error) {

            const student = new StudentRequestModel(request.body);
            const message = await studentService.create(student, request.user.sub);

            responseHttp.success(response, message, 201);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible crear el estudiante", error, 400);
    }
}

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await studentService.read(request.user.sub)

            const students = [];
    
            array.forEach(student => {
                students.push(new StudentResponseModel(student));
            });
    
            responseHttp.success(response, students, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los estudiantes", error, 500);
    }
}

const searchById = async (request, response) => {
    try {

        if(!request.user.error) {

            const student = await studentService.searchById(request.params.id, request.user.sub);

            responseHttp.success(response, new StudentResponseModel(student), 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer el estudiante", error, 400);
    }
}

const edit = async (request, response) => {
    try {

        if(!request.user.error) {

            const student = new StudentRequestModel(request.body);
            const message = await studentService.edit(request.params.id, student, request.user.sub);

            responseHttp.success(response, message, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible actualizar el estudiante", error, 400);
    }
}

const remove = async (request, response) => {
    try {

        if(!request.user.error) {

            await studentService.remove(request.params.id, request.user.sub);
            responseHttp.success(response, "", 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible eliminar el estudiante", error, 400);
    }
}

export default { create, read, searchById, edit, remove };