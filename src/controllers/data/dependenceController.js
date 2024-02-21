import { DataResModel } from "../../models/data/dataModel.js";
import dependenceService from "../../services/data/dependenceService.js";
import resHttp from "../../utils/resHttp.js";

const read = async (req, res) => {
    try {
        const array = await dependenceService.read();
        const dependences = [];
        array.forEach(dependence => dependences.push(new DataResModel(dependence.id, dependence.name)));
        resHttp.success(res, dependences, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer las dependencias", error, 500);
    }
}

export default { read };