import type { UserLogin, UserRegistrate} from "../../domain/user/entity.js";
import type { RegisterUserResponse, LoginUserResponse, GetUserByIdResponse} from "../../transport/dto/user/response.js"


export interface UserService {
    registerUser(userRegistrate: UserRegistrate): Promise<RegisterUserResponse>
    loginUser(userLogin: UserLogin): Promise<LoginUserResponse>
}
