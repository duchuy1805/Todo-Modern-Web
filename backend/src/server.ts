import express from 'express'
import router from './routes/task.routes.js'
import databaseService from './services/database.services.js'
import { userRouter } from './routes/user.routes.js'
import cors from 'cors'
import dotenv from 'dotenv' 

dotenv.config()

const app = express()

const port = process.env.PORT || 5001 

app.use(express.json())


app.use(cors({
  origin: process.env.CLIENT_URL || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true 
}))

app.use('/api/tasks', router)
app.use('/api/users', userRouter)

databaseService.connect().then(() => {
    app.listen(port, () => {
     
        console.log(`Server is running at port: ${port}`)
    })
}).catch((err: any) => {
    console.error("Critical error starting server:", err)
})