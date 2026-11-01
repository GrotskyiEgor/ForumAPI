import type { UserService } from "./types.js";
import type { UserRepository } from "../../domain/user/repository.js";
import { PasswordNotCorrectError, EmailNotCorrectError, UserAlreadyExistError, UserNotFoundError, InvalidRefreshTokenError } from "../../transport/dto/user/errors.js";
import { verifyPassword } from "../../lib/password.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../lib/jwt.js";


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
        },

        async refresh(refreshToken) {
            let userId: number

            try {
                userId = verifyRefreshToken(refreshToken)
            } catch {
                return { success: false, error: new InvalidRefreshTokenError()}
            }

            const user = await userRepository.getUserById(userId)

            if(!user){
                return { success: false, error: new InvalidRefreshTokenError()}
            }

            return {
                success: true,
                data: {
                    accessToken: signAccessToken(user.id),
                    refreshToken: signRefreshToken(user.id),
                },
            }
        },
    }
}