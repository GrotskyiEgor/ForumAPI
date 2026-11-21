import type { UserService } from "./types.js";
import type { UserRepository } from "../../domain/user/repository.js";
import type { RefreshSessionRepository } from "../../domain/refreshSession/repository.js";
import type { Tokens } from "../../transport/dto/user/response.js";
import { PasswordNotCorrectError, EmailNotCorrectError, UserAlreadyExistError, UserNotFoundError, InvalidRefreshTokenError } from "../../transport/dto/user/errors.js";
import { verifyPassword } from "../../lib/password.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken, hashRefreshToken, getRefreshTokenExpiresAt } from "../../lib/jwt.js";


export function createUserService(
    userRepository: UserRepository,
    refreshSessionRepository: RefreshSessionRepository,
): UserService {
    // Створює пару токенів і зберігає хеш refresh-токена як нову сесію
    async function issueTokens(userId: number): Promise<Tokens> {
        const accessToken = signAccessToken(userId)
        const refreshToken = signRefreshToken(userId)

        await refreshSessionRepository.create({
            userId,
            tokenHash: hashRefreshToken(refreshToken),
            expiresAt: getRefreshTokenExpiresAt(refreshToken),
        })

        return { accessToken, refreshToken }
    }

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

            const tokens = await issueTokens(user.id)

            return { success: true, data: { user, tokens } }
        },

        async refresh(refreshToken) {
            let userId: number

            try {
                userId = verifyRefreshToken(refreshToken)
            } catch {
                return { success: false, error: new InvalidRefreshTokenError()}
            }

            const session = await refreshSessionRepository.deleteByTokenHash(hashRefreshToken(refreshToken))

            if(!session || session.userId !== userId || new Date(session.expiresAt) <= new Date()){
                return { success: false, error: new InvalidRefreshTokenError()}
            }

            const user = await userRepository.getUserById(userId)

            if(!user){
                return { success: false, error: new InvalidRefreshTokenError()}
            }

            return { success: true, data: await issueTokens(user.id) }
        },

        async logout(refreshToken) {
            await refreshSessionRepository.deleteByTokenHash(hashRefreshToken(refreshToken))
        },
    }
}