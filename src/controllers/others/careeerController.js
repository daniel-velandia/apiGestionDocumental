import { CareerResponseModel } from "../../models/others/careerModel.js";
import careerService from "../../services/others/careerService.js";
import responseHttp from "../../utils/responseHttp.js";

const read = async (request, response) => {
    try {

        if(!request.user.error) {

            const array = await careerService.read();

            const careers = [];
    
            array.forEach(career => {
                careers.push(new CareerResponseModel(career));
            });
    
            responseHttp.success(response, careers, 200);

        } else {
            responseHttp.error(response, "", request.user.error, 403);
        }
        
    } catch (error) {
        responseHttp.error(response, "No es posible leer las carreras", error, 500);
    }
}

export default { read };