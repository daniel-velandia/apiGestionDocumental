class UserRequestModel {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
}

class UserResponseModel {
    constructor(user) {
        this.userId = user.user_id;
        this.username = user.username;
        this.email = user.email;
    }
}

export { UserRequestModel, UserResponseModel };