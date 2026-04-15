import databaseService from "./database.services.js"

class TaskService{
    async getAllTasks(){
        const tasks= (await databaseService.tasks.find().sort({createdAt: -1}).toArray())
        return tasks
    }
}
const taskService= new TaskService()
export default taskService