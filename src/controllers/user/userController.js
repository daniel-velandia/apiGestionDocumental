import userService from "../../services/user/userService.js";
import { UserReqModel, UserResModel } from "../../models/user/userModel.js";
import resHttp from "../../utils/resHttp.js";

const create = async (req, res) => {
    try {
        const user = new UserReqModel(req.body);
        const message = await userService.create(user);
        resHttp.success(res, message, 201);
    } catch (error) {
        resHttp.error(res, "Error al crear usuario", error, 400);
    }
}

const searchByUsername = async (req, res) => {
    try {
        const user = await userService.searchByUsername(req.user.sub);
        const userRes = new UserResModel(user);
        resHttp.success(res, userRes, 200);
    } catch (error) {
        resHttp.error(res, "Error al leer usuario", error, 500);
    }
}

const login = async (req, res) => {
    resHttp.login(req, res, 200);
}

export default { create, searchByUsername, login };