import joi from "joi"
export const addBookSchema = joi.object({
    bookName: joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(100).required(),
    writerName: joi.string().min(3).max(20).required(),
    
})