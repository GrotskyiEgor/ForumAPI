export class InvalidCredentialsError extends Error {
	constructor(message = "Invalid credentials") {
		super(message);
		this.name = "InvalidCredentialsError";
	}
}

export class UserAlreadyExistError extends Error {
	constructor(message = "User with that email already exists") {
		super(message);
		this.name = "UserAlreadyExistError";
	}
}

export class UserNotFoundError extends Error {
	constructor(message = "User not found") {
		super(message);
		this.name = "UserNotFoundError";
	}
}

export class InvalidRefreshTokenError extends Error {
	constructor(message = "Invalid refresh token") {
		super(message);
		this.name = "InvalidRefreshTokenError";
	}
}
