import { signToken } from "../utils/jwt.js";
import databaseService from "./database.services.js";
import { TokenType } from "../constants/enum.js";
class UserService {
    async checkEmailExist(email: string){
        const user= await databaseService.users.findOne({email})
        return Boolean(user)
    }
    async signAccessToken(user_id: string){
        return signToken({
            payload:{
                user_id,
                token_type: TokenType.accessToken
            },
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as any,
                algorithm: 'HS256'
            }
        })
    }
    async signRefreshTOken(user_id: string){
        return signToken({
          payload: {
            user_id,
            token_type: TokenType.refreshToken
          }  ,
          options: {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as any,
            algorithm:'HS256'
          }
        })
    }
    private signAccessRefreshToken(user_id: string){
        return Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshTOken(user_id)
        ])
    }
}