import express from "express"
import { auth } from "../../middleWare/auth.js"
import { validation } from "../../middleWare/validation.js"
import { addBookSchema } from "./book.validation.js"
import { addBook, search,allBookIssued,allBookReturned ,issuedBook,returnedBook} from "./bookController/book.controller.js"

export const bookRouter = express.Router() 

//-- addBook --//
bookRouter.post("/add",validation(addBookSchema),addBook)
//-- search --//
bookRouter.get("/search",auth,search)
//-- allBookIssued --//
bookRouter.get("/allBookIssued",allBookIssued)
//-- allBookReturned --//
bookRouter.get("/allBookReturned",allBookReturned)
//-- issuedBook --//
bookRouter.put("/issuedBook",auth,issuedBook)
//-- returnedBook --//
bookRouter.put("/returnedBook",auth,returnedBook)


