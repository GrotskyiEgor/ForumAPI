import type { Response,  Request} from "express";

import type { UserLogin, UserRegistrate} from "../../dto/user/request.js";
import type { User } from "../../../domain/user/entity.js";


export interface UserHandlers {
    registerUser(req: Request<{}, {}, {name: string, email: string, password: string}>, res: Response): Promise<Response<User | { error: string}>>
    loginUser(req: Request<{}, {}, {email: string, password: string}>, res: Response): Promise<Response<User | { error: string}>>
}