import studentService from "../services/studentService.js";
import { StudentRequestModel, StudentResponseModel } from "../models/studentModel.js";
import responseHttp from "../utils/responseHttp.js";

const create = (request, response) => {

    if(!request.user.error) {
        
        studentService.create(new StudentRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 201);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible crear el estudiante", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const read = (request, response) => {

    if(!request.user.error) {
        
        studentService.read(request.user.sub)
        .then(array => {
    
            const students = [];
    
            array.forEach(student => {
                students.push(new StudentResponseModel(student));
            });
    
            responseHttp.success(response, students, 200);
        })
        .catch(error => {
            responseHttp.error(response, "No es posible leer los estudiantes", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const detail = (request, response) => {

    if(!request.user.error) {
        
        studentService.detail(request.params.id, request.user.sub)
        .then(student => {
            responseHttp.success(response, new StudentResponseModel(student), 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al leer el estudiante", error, 500);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const edit = (request, response) => {

    if(!request.user.error) {
        
        studentService.edit(request.params.id, new StudentRequestModel(request.body), request.user.sub)
        .then(message => {
            responseHttp.success(response, message, 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al actualizar el estudiante", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

const remove = (request, response) => {

    if(!request.user.error) {
        
        studentService.remove(request.params.id, request.user.sub)
        .then(() => {
            responseHttp.success(response, "Estudiante eliminado con exito", 200);
        })
        .catch(error => {
            responseHttp.error(response, "Error al eliminar el estudiante", error, 400);
        });

    } else {
        responseHttp.error(response, "", request.user.error, 403);
    }
}

export default { create, read, detail, edit, remove };