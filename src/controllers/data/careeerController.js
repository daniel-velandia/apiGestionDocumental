import { DataResModel } from "../../models/data/dataModel.js";
import careerService from "../../services/data/careerService.js";
import resHttp from "../../utils/resHttp.js";

const read = async (req, res) => {
    try {
        const array = await careerService.read();
        const careers = [];
        array.forEach(career => careers.push(new DataResModel(career.id, career.name)));
        resHttp.success(res, careers, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer las carreras", error, 500);
    }
}

export default { read };