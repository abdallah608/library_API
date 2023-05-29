// handling errors
process.on("uncaughtException",(err,req,res,next)=>{
    console.log(err);
})
// .env
import * as dotenv from 'dotenv'
dotenv.config()
// imports
import express from 'express'
import { connection } from './dataBase/connection/connection.js'
import { bookRouter } from './src/bookModule/book.router.js'
import { userRouter } from './src/userModule/user.router.js';
import globalError from './utilities/error/globalError.js'
// server express
const app = express()
const port = process.env.port || 8000
// express middleware
app.use(express.json())
app.use(express.static("uploads"))


// server mongoDB
connection()
// routing
app.use("/user",userRouter)
app.use("/book",bookRouter)

// routing server express
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// handling errors
app.all("*",(req,res,next)=>{
    next(new appError(`Invalid Url ${req.originalUrl}`,404))
   })
   process.on("unhandledRejection",(err,req,res,next)=>{
       next(err)
   
   })
   app.use(globalError)