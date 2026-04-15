import {Request,Response } from "express"
import taskService from "../services/task.services.js"
import Task from "../models/tasks.schemas.js"
import databaseService from "../services/database.services.js"
import { ObjectId } from "mongodb"
export const getAllTasks = async (req: Request, res: Response) => {   
    const { user_id } = (req as any).decoded_authorization

    const tasks = await databaseService.tasks
        .find({ user_id: new ObjectId(user_id) }).toArray()

    const activeCount = tasks.filter(t => t.status === "active").length
    const completeCount = tasks.filter(t => t.status === "complete").length

    res.json({ tasks, activeCount, completeCount });
}
export const createTask= async (req: Request,res: Response) => {
    try{
        const {title}= req.body
        const { user_id } = (req as any).decoded_authorization
        if (!title) {
            return res.status(400).json({ message: "Bắt buộc phải điền tên nhiệm vụ" });
        }
        const result = await databaseService.tasks.insertOne({
            title: title, 
            user_id: new ObjectId(user_id),
            status: "active",
            createdAt: new Date().toISOString(), 
        })
        res.status(201).json({
            message: "Imported task succeeded",
            insertedId: result.insertedId
        })

    }catch(error){  
        console.log("Lỗi khi gọi createTask", error)
        res.status(500).json({message:"Lỗi hệ thống"})
    }
}
export const updateTask= async (req: Request,res: Response) => {
    try{
        const {id}= req.params
        const {title, status, completedAt}= req.body
        if(!ObjectId.isValid(id as string)){
            return res.status(400).json({message: "Id không hợp lệ"})
        }
        const result= await databaseService.tasks.findOneAndUpdate({_id: new ObjectId(id as string)},
    { 
                $set: {
                    title,
                    status,
                    completedAt: completedAt ? new Date(completedAt) : undefined,
                    updated_at: new Date() 
                } 
            },
        { returnDocument: 'after' }
    )
        if (!result) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại" })
        }
        res.status(200).json({
            message: "Cập nhật nhiệm vụ thành công",
            data: result
        })
    }catch(error){
        console.log("Lỗi khi gọi updateTask", error)
        res.status(500).json({message:"Lỗi hệ thống"})
    }
}

export const deleteTask=async (req: Request,res: Response) => {
    try{
        const {id} = req.params
        if(!ObjectId.isValid(id as string)){
            return res.status(400).json({message: "Id không hợp lệ"})
        }
        const result= await databaseService.tasks.deleteOne({_id: new ObjectId(id as string)})
        res.status(200).json({message: "Đã xóa task"})
    }
    catch(error){
        console.log("Lỗi khi gọi deleteTask", error)
        res.status(500).json({message:"Lỗi hệ thống"})
    }
}