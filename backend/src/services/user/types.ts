import type { UserLogin, UserRegistrate } from "../../transport/dto/user/request.js"
import type { RegisterUserResponse, LoginUserResponse, GetUserByIdResponse, RefreshUserResponse} from "../../transport/dto/user/response.js"


export interface UserService {
    registerUser(userRegistrate: UserRegistrate): Promise<RegisterUserResponse>
    loginUser(userLogin: UserLogin): Promise<LoginUserResponse>
    refresh(refreshToken: string): Promise<RefreshUserResponse>
}