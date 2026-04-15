import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation.js'

export const createTaskValidator = validate(
  checkSchema({
    title: {
      notEmpty: {
        errorMessage: 'Tiêu đề nhiệm vụ không được để trống'
      },
      isString: {
        errorMessage: 'Tiêu đề phải là một chuỗi ký tự'
      },
      trim: true,
      isLength: {
        options: { min: 1, max: 200 },
        errorMessage: 'Tiêu đề phải từ 1 đến 200 ký tự'
      }
    }
  }, ['body'])
)