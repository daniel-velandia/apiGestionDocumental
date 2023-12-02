class StudentRequestModel {
    constructor(student) {
        this.idCard = student.idCard;
        this.name = student.name;
        this.lastName = student.lastName;
        this.email = student.email;
        this.phone = student.phone;
        this.careerId = student.careerId;
        this.semester = student.semester;
    }
}

class StudentResponseModel {
    constructor(student) {
        this.entityId = student.entity_id;
        this.idCard = student.id_card;
        this.name = student.name;
        this.lastName = student.last_name;
        this.email = student.email;
        this.phone = student.phone;
        this.career = student.career;
        this.dateChangedStudentHistory = student.created_date;
        this.semester = student.semester;
    }
}

export { StudentRequestModel, StudentResponseModel };