import { DependenceResponseModel } from "../../models/others/dependenceModel.js";
import dependenceService from "../../services/others/dependenceService.js";
import responseHttp from "../../utils/responseHttp.js";

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await dependenceService.read();
    
            const dependences = [];
    
            array.forEach(dependence => {
                dependences.push(new DependenceResponseModel(dependence));
            });

            responseHttp.success(response, dependences, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer las dependencias", error, 500);
    }
}

export default { read };