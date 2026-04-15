import express from 'express'
import router from './routes/task.routes.js'
import databaseService from './services/database.services.js'
import { userRouter } from './routes/user.routes.js'
import cors from 'cors'
const app= express()
const port = 5001
app.use(express.json())
app.use(cors())
app.use('/api/tasks' ,router)
app.use('/api/users', userRouter)
databaseService.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running accurately at: http://localhost:${port}`)
    })
}).catch((err: any) => {
    console.error("Critical error starting server:", err)
})