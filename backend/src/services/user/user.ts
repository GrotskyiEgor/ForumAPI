import type { UserService } from "./types.js";
import type { UserRepository } from "../../domain/user/repository.js";
import { PasswordNotCorrectError, EmailNotCorrectError, UserAlreadyExistError, UserNotFoundError } from "../../transport/dto/user/errors.js";
import { verifyPassword } from "../../lib/password.js";


export function createUserService(userRepository: UserRepository): UserService {
    return {
        async registerUser(userRegistrate) {
            const user = await userRepository.getUserByEmail(userRegistrate.email)
            
            if(!user){
                const createdUser = await userRepository.createUser(userRegistrate)
                return { success: true, data: createdUser}
            }
            
            return { success: false, error: new UserAlreadyExistError()}
        
        },

        async loginUser(userLogin) {
            const user = await userRepository.getUserByEmail(userLogin.email)
            
            if(!user){
                return { success: false, error: new EmailNotCorrectError()}
            }

            if(!await verifyPassword(user.password, userLogin.password)){
                return { success: false, error: new PasswordNotCorrectError()}
            }

            return { success: true, data: user}
        }
    }
}