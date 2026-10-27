import type { UserService } from "../../../services/user/types.js";
import type { UserHandlers } from "./types.js";


export function createUserHandlers(userService: UserService): UserHandlers {
    return {
        async registerUser(req, res) {
            const { name, email, password } = req.body

            if(!name || !email || !password){
                return res.status(400).json({ error: "Missing required fields"})
            }

            const result = await userService.registerUser({ name, email, password })
            
            if (!result.success) {
                console.log(result.error.message)
                return res.status(409).json({ error: result.error.message})
            }

            return res.status(200).json(result.data)
        },
        
        async loginUser(req, res){
            const { email, password } = req.body
            const result = await userService.loginUser({email, password })

            if (!result.success){
                return res.status(422).json({ error: result.error.message})
            }

            return res.status(200).json(result.data)
        }
    }
}