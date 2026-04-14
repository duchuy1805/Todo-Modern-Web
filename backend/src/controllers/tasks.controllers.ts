import {Request,Response } from "express"
import taskService from "../services/task.services.js"
export const getAllTasks= async (req: Request,res: Response) => {   
    try{
        const tasks= await taskService.getAllTasks()
        console.log(tasks)
        res.status(200).json({tasks})
    }catch(error){
        console.log("Lỗi khi gọi getAllTasks", error)
        res.status(500).json({message:"Lỗi hệ thống"})
    }
    
}
export const createTask= (req: Request,res: Response) => {
    res.status(201).json({ message:"Đã thêm nhiệm vụ mới thành công"})
}
export const updateTask= (req: Request,res: Response) => {
    res.status(201).json({ message:"Đã update nhiệm vụ thành công"})
}

export const deleteTask= (req: Request,res: Response) => {
    res.status(201).json({ message:"Đã xóa nhiệm vụ thành công"})
}