class StudentRequestModel {
    constructor(student) {
        this.idCard = student.idCard;
        this.name = student.name;
        this.lastName = student.lastName;
        this.email = student.email;
        this.phone = student.phone;
        this.career = student.career;
        this.semester = student.semester;
    }
}

class StudentResponseModel {
    constructor(student) {
        this.studentId = student.studentId;
        this.idCard = student.idCard;
        this.name = student.name;
        this.lastName = student.lastName;
        this.email = student.email;
        this.phone = student.phone;
        this.career = student.career;
        this.semester = student.semester;
    }
}

export { StudentRequestModel, StudentResponseModel };