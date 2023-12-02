import { EntityTypeResponseModel } from "../../models/others/entityTypeModel.js";
import entityTypeService from "../../services/others/entityTypeService.js";
import responseHttp from "../../utils/responseHttp.js";

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await entityTypeService.read();
    
            const entityTypes = [];
    
            array.forEach(type => {
                entityTypes.push(new EntityTypeResponseModel(type));
            });

            responseHttp.success(response, entityTypes, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer los tipos de entidad", error, 500);
    }
}

export default { read };