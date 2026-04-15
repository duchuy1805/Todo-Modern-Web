import express from 'express'
import router from './routes/task.routes.js'
import databaseService from './services/database.services.js'
const app= express()
const port = 5001
app.use(express.json())
app.use('/api/tasks' ,router)
databaseService.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running accurately at: http://localhost:${port}`)
    })
}).catch((err: any) => {
    console.error("Critical error starting server:", err)
})