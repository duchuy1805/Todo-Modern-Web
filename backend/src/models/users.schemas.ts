import { ObjectId } from "mongodb"

interface UserType{
    _id?: ObjectId
    name: string
    password: string
    email: string
    email_verify_token?: string
    created_at: Date
}
export default class User{
    _id?: ObjectId
    name: string
    password: string
    email: string
    email_verify_token: string
    created_at?: Date
    constructor(user: UserType){
        this._id=user._id || new ObjectId()
        this.name=user.name
        this.password=user.password
        this.email=user.email
        this.email_verify_token= user.email_verify_token || ''
        this.created_at= user.created_at || new Date()  
    }
}
interface RefreshTokenType {
    _id?:ObjectId
    user_id: ObjectId
    token: string 
    created_at: Date
    iat?: number 
    exp?: number 
}
export class RefreshToken {
    _id?: ObjectId
    user_id: ObjectId
    token: string
    created_at: Date
    iat?: number | undefined
    exp?: number | undefined
    constructor(refreshToken: RefreshTokenType) {
        this._id = refreshToken._id || new ObjectId()
        this.user_id = refreshToken.user_id
        this.token = refreshToken.token
        this.created_at = refreshToken.created_at || new Date()
        this.iat = refreshToken.iat  
        this.exp = refreshToken.exp 
    }
}