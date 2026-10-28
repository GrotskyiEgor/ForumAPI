export class PostNotFoundError extends Error{
    constructor(message="Post not found"){
        super(message)
        this.name = "PostNotFoundError"    
    }
}

export class InvalidUserIdError extends Error{
    constructor(message="Invalid user ID"){
        super(message)
        this.name = "InvalidUserIdError"    
    }
}

export class PostAllFieldsRequiredError extends Error{
    constructor(message="All post fields are required"){
        super(message)
        this.name = "PostAllFieldsRequiredError"
    }
}