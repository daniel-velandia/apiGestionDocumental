import { DataResModel } from "../../models/data/dataModel.js";
import documentTypeService from "../../services/data/documentTypeService.js";
import resHttp from "../../utils/resHttp.js";

const read = async (req, res) => {
    try {
        const array = await documentTypeService.read();
        const documentTypes = [];
        array.forEach(type => documentTypes.push(new DataResModel(type.id, type.name)));
        resHttp.success(res, documentTypes, 200);
    } catch (error) {
        resHttp.error(res, "No es posible leer los tipos de documento", error, 500);
    }
}

export default { read };