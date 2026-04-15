import jwt, {SignOptions} from 'jsonwebtoken'
import 'dotenv/config'

export const signToken= ({
    payload,
    privateKey= process.env.JWT_SECRET as string,
    options= {}
}:{
    payload: string | Buffer | object
    privateKey?: string
    options?: SignOptions}) =>
    {
        return new Promise<string>((resolve, reject) => {
            const jwtOptions: SignOptions = {
              algorithm: 'HS256',
              ...options
            
    }
    jwt.sign(payload, privateKey, jwtOptions, (error, token) => {
        if(error){
            return reject(error)
        }
        resolve(token as string)
    })
})
}
export const verifyToken = (token: string, secretKey= process.env.JWT_SECRET as string) => {
    return new Promise<any>((resolve, reject)=>{
        jwt.verify(token, secretKey, (error, decoded) => {
            if(error){
               return reject(error)
            }
            resolve(decoded)
        })
    })
}

