import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasks.controllers.js'
import { accessTokenValidator } from '../middlewares/auth.middlewares.js'
import { wrapAsync } from '../utils/handler.js'
import { createTaskValidator } from '../middlewares/task.middlewares.js'
const router= express.Router()
router.use(accessTokenValidator)
router.get('/', wrapAsync(getAllTasks))
router.post('/', createTaskValidator, wrapAsync(createTask))
router.put('/:id', wrapAsync(updateTask))
router.delete('/:id', wrapAsync(deleteTask))
export default router