import { signToken } from "../utils/jwt.js"
import databaseService from "./database.services.js"
import { TokenType } from "../constants/enum.js"
import { RegisterReqBody } from "../models/models/users.requests.js"
import User, { RefreshToken } from "../models/users.schemas.js"
import { hashPassword } from "../utils/crypto.js"
import { ObjectId } from "mongodb"

class UserService {
    async logout(refresh_token: string){
        const result= await databaseService.refresh_token.deleteOne({token: refresh_token})
        return result
    }
    async login (user_id: string){
        const[access_token, refresh_token]= await this.signAccessRefreshToken(user_id)
        await databaseService.refresh_token.insertOne(
             new RefreshToken({
            user_id: new ObjectId(user_id),
            token: refresh_token,
            created_at: new Date()
    })
        )
        const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) }, { projection: { password: 0 } })
        return{
            access_token,
            refresh_token,
            user
        }
    }
    async register(payload: RegisterReqBody){
        const {name, email, password}= payload
        const result= await databaseService.users.insertOne(
            new User({
                name: payload.name,
                email: payload.email,
                password: hashPassword(payload.password.trim()),
                created_at: new Date()
            })
        )
        const user_id = result.insertedId.toString()
        const[access_token, refresh_token]= await this.signAccessRefreshToken(user_id)
        await databaseService.refresh_token.insertOne(
            new RefreshToken({
            user_id: result.insertedId,
            token: refresh_token,
            created_at: new Date()
            } as any)
        )
        const user = await databaseService.users.findOne({_id: (await result).insertedId}, {projection: {password: 0}})
        return {
            access_token,
            refresh_token,
            user
        }
    }

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
const userService= new UserService()
export default userService