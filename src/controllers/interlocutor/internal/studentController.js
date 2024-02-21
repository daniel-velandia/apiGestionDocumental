import studentService from "../../../services/interlocutor/internal/studentService.js";
import { StudentReqModel, StudentResModel } from "../../../models/interlocutor/internal/studentModel.js";
import resHttp from "../../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const student = new StudentReqModel(req.body);
        const message = await studentService.create(student, req.user.sub);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "No es posible crear el estudiante", error, 400);
    }
}

const read = async (req, res) => {
    try {
        const array = await studentService.read(req.user.sub);
        const students = [];
        array.forEach(student => students.push(new StudentResModel(student)));
        resHttp.success(res, students, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los estudiantes", error, 500);
    }
}

const searchById = async (req, res) => {
    try {
        const student = await studentService.searchById(req.params.id, req.user.sub);
        resHttp.success(res, new StudentResModel(student), 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer el estudiante", error, 400);
    }
}

const edit = async (req, res) => {
    try {
        const student = new StudentReqModel(req.body);
        const message = await studentService.edit(req.params.id, student, req.user.sub);
        resHttp.success(res, message, 200);
    } catch (error) {
        resHttp.error(res, "No es posible actualizar el estudiante", error, 400);
    }
}

const remove = async (req, res) => {
    try {
        await studentService.remove(req.params.id, req.user.sub);
        resHttp.success(res, "", 200);
    } catch (error) {
        resHttp.error(res, "No es posible eliminar el estudiante", error, 400);
    }
}

export default { create, read, searchById, edit, remove };