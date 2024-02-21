import { DataEntityModel, DataResModel } from "../../data/dataModel.js";

class StudentReqModel {
    constructor(student) {
        this.idCard = student.idCard;
        this.name = student.name;
        this.lastName = student.lastName;
        this.email = student.email;
        this.phone = student.phone;
        this.studyData = new StudyDataReqModel(student.studyData);
    }
}

class StudentResModel {
    constructor(student) {
        this.interlocutorId = student.interlocutorId;
        this.idCard = student.idCard;
        this.name = student.name;
        this.lastName = student.lastName;
        this.email = student.email;
        this.phone = student.phone;
        if(student.studyData)
            this.studyData = new StudyDataResModel(student.studyData);
    }
}

class StudentEntityModel {
    constructor(student) {
        this.id = student.id;
        this.interlocutorDbId = student.interlocutor_db_id;
        this.personDbId = student.person_db_id;
        this.interlocutorId = student.interlocutor_id;
        this.idCard = student.id_card;
        this.name = student.name;
        this.lastName = student.last_name;
        this.email = student.email;
        this.phone = student.phone;
        this.type = student.type;
        if(student.created_date)
            this.studyData = new StudyDataEntityModel(
                student.created_date,
                student.semester,
                student.career_db_id,
                student.career_name
            );
    }
}

class StudyDataReqModel {
    constructor(data) {
        this.semester = data.semester;
        this.careerDbId = data.careerDbId;
    }
}

class StudyDataResModel {
    constructor(data) {
        this.createdDate = data.createdDate;
        this.semester = data.semester;
        this.career = new DataResModel(data.career);
    }
}

class StudyDataEntityModel {
    constructor(createdDate, semester, careerDbId, i) {
        this.createdDate = createdDate;
        this.semester = semester;
        this.career = new DataEntityModel(careerDbId, i);
    }
}

export { StudentReqModel, StudentResModel, StudentEntityModel };