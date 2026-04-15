import express from 'express'
import { loginValidator, registerValidator, refreshTokenValidator } from '../middlewares/user.middlewares.js'
import { validate } from '../utils/validation.js'
import { loginController, logoutController, registerController } from '../controllers/user.controllers.js'
import { wrapAsync } from '../utils/handler.js'
import { accessTokenValidator } from '../middlewares/auth.middlewares.js'
export const userRouter= express.Router()

userRouter.post('/login', validate(loginValidator), wrapAsync(loginController))
userRouter.post('/register', validate(registerValidator), wrapAsync(registerController))
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

