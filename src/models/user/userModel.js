class UserReqModel {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
}

class UserResModel {
    constructor(user) {
        this.userId = user.userId;
        this.username = user.username;
        this.email = user.email;
    }
}

class UserEntityModel {
    constructor(user) {
        this.id = user.id;
        this.userId = user.user_id;
        this.username = user.username;
        this.encryptedPassword = user.encrypted_password;
        this.email = user.email;
    }
}

export { UserReqModel, UserResModel, UserEntityModel };