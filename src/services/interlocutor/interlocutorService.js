import { interlocutorTypes } from "../../utils/constants.js";
import companyService from "./external/companyService.js";
import externalPersonService from "./external/externalPersonService.js";
import functionaryService from "./internal/functionaryService.js";
import studentService from "./internal/studentService.js";

const searchByIdAndType = async (interlocutor, username, date = new Date()) => {
    const {type, interlocutorId} = interlocutor;

    switch (type) {
        case interlocutorTypes.student:
            return await studentService.searchByIdAndDate(interlocutorId, username, date);
        case interlocutorTypes.functionary:
            return await functionaryService.searchById(interlocutorId, username);
        case interlocutorTypes.externalPerson:
            return await externalPersonService.searchById(interlocutorId, username);
        case interlocutorTypes.company:
            return await companyService.searchById(interlocutorId, username);
    }
}

export default { searchByIdAndType };