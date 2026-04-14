import { statusType } from "../constants/enum.js"
interface TaskType{
    title: string,
    status: statusType,
    completedAt: Date
    
}
export default class Task{
    title: string
    status: statusType
    completedAt: Date
    constructor(task: TaskType){
        this.title= task.title,
        this.status=task.status,
        this.completedAt= task.completedAt
    }
}