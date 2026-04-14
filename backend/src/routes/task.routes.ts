import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasks.controllers.js'
const router= express.Router()
export default router
router.get('/', getAllTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)