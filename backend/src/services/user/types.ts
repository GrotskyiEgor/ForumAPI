import type { UserRepository } from "../../domain/user/repository.js"
import type { RefreshSessionRepository } from "../../domain/refreshSession/repository.js"
import type { PasswordHasher } from "../../lib/password.js"
import type { TokenService } from "../../lib/jwt.js"
import type { UserLogin, UserRegistrate } from "../../transport/dto/user/request.js"
import type { RegisterUserResponse, LoginUserResponse, GetUserByIdResponse, RefreshUserResponse} from "../../transport/dto/user/response.js"

export interface UserServiceDeps {
    users: UserRepository
    sessions: RefreshSessionRepository
    passwords: PasswordHasher
    tokens: TokenService
    refreshTtlMs: number
}

export interface UserService {
    registerUser(userRegistrate: UserRegistrate): Promise<RegisterUserResponse>
    loginUser(userLogin: UserLogin): Promise<LoginUserResponse>
    refresh(refreshToken: string): Promise<RefreshUserResponse>
    me(userId: number): Promise<GetUserByIdResponse>
    logout(refreshToken: string): Promise<void>
}
