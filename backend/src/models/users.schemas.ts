interface UserType{
    user_name: string
    name: string
    password: string
    email: string
    email_verify_token: string
    created_at: Date
}
export default class User{
    user_name: string
    name: string
    password: string
    email: string
    email_verify_token: string
    created_at: Date
    constructor(user: UserType){
        this.user_name= user.user_name
        this.name=user.name
        this.password=user.password
        this.email=user.email
        this.email_verify_token= user.email_verify_token
        this.created_at= user.created_at    
    }
}