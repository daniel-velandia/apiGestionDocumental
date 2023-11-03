class UserRequestModel {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
}

class UserResponseModel {
    constructor(user) {
        this.userId = user.userId;
        this.username = user.username;
        this.email = user.email;
    }
}

export { UserRequestModel, UserResponseModel };