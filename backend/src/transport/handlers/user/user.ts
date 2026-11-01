import { createCookieAccessToken, createCookieRefreshToken } from "../../../lib/createTokens.js";
import { signAccessToken, signRefreshToken } from "../../../lib/jwt.js";
import type { UserService } from "../../../services/user/types.js";
import type { UserHandlers } from "./types.js";


export function createUserHandlers(userService: UserService): UserHandlers {
    return {
        async registerUser(req, res) {
            const { name, email, password } = req.body

            if(!name || !email || !password){
                return res.status(400).json({ error: "Missing required fields"})
            }

            try {
                const result = await userService.registerUser({ name, email, password })
                
                if (!result.success) {
                    console.log(result.error.message)
                    return res.status(409).json({ error: result.error.message})
                }
    
                return res.status(200).json(result.data)
            } catch (error) {
                console.log(error)
                return res.status(500).json({error: "Server error"})
            }
        },
        
        async loginUser(req, res){
            const { email, password } = req.body

            try {
                const result = await userService.loginUser({email, password })
    
                if (!result.success){
                    return res.status(422).json({ error: result.error.message})
                }

                const user = result.data

                const accessToken = signAccessToken(user.id)
                const refreshToken = signRefreshToken(user.id)

                createCookieAccessToken(res, accessToken)
                createCookieRefreshToken(res, refreshToken)

                return res.status(200).json(result.data)
            } catch (error) {
                console.log(error)
                return res.status(500).json({error: "Server error"})
            }
        },
         
        async refresh(req, res) {
            const refreshToken = req.cookies?.refreshToken

            if(typeof refreshToken !== "string"){
                return res.status(401).json({ error: "Unauthorized"})
            }

            try {
                const result = await userService.refresh(refreshToken)

                if (!result.success){
                    return res.status(401).json({ error: result.error.message})
                }

                createCookieAccessToken(res, result.data.accessToken)
                createCookieRefreshToken(res, result.data.refreshToken)

                return res.status(200).json({ message: "success"})
            } catch (error) {
                console.log(error)
                return res.status(500).json({error: "Server error"})
            }
        },
    }
}


