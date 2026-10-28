export class PasswordNotCorrectError extends Error {
    constructor(message="Password is not correct") {
        super(message)
        this.name = "PasswordNotCorrectError"
    }
}

export class EmailNotCorrectError extends Error {
    constructor(message="Email is not correct") {
        super(message)
        this.name = "EmailNotCorrectError"
    }
}

export class UserAlreadyExistError extends Error{
    constructor(message="User with that email already exists"){
        super(message)
        this.name = "UserAlreadyExistError"    
    }
}

export class UserNotFoundError extends Error{
    constructor(message="User not found"){
        super(message)
        this.name = "UserNotFoundError"
    }
}