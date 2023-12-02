import { DocumentTypeResponseModel } from "../../models/others/documentTypeModel.js";
import documentTypeService from "../../services/others/documentTypeService.js";
import responseHttp from "../../utils/responseHttp.js";

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await documentTypeService.read();
    
            const documentTypes = [];
    
            array.forEach(type => {
                documentTypes.push(new DocumentTypeResponseModel(type));
            });

            responseHttp.success(response, documentTypes, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los tipos de documento", error, 500);
    }
}

export default { read };