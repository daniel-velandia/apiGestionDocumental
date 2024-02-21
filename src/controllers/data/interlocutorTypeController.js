import { DataResModel } from "../../models/data/dataModel.js";
import interlocutorTypeService from "../../services/data/interlocutorTypeService.js";
import resHttp from "../../utils/resHttp.js";

const read = async (req, res) => {
    try {
        const array = await interlocutorTypeService.read();
        const interlocutorTypes = [];
        array.forEach(type => interlocutorTypes.push(new DataResModel(type.id, type.name)));
        resHttp.success(res, interlocutorTypes, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los tipos de interlocutor", error, 500);
    }
}

export default { read };