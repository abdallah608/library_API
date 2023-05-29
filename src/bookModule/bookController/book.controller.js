import moment from "moment/moment.js"
import { bookModel } from "../../../dataBase/models/bookModel/book.model.js"
import jwt from "jsonwebtoken"
import catchAsyncError from "../../../utilities/error/catchAsyncError.js"
import appError from "../../../utilities/error/appError.js"

//-- addBook --//
export const addBook = catchAsyncError( 
    async (req,res,next)=>{
    let {bookName,description,writerName}=req.body
    let founded= await bookModel.findOne({bookName})
    if(founded){return next(new appError("book already added",302))}
    let added =await bookModel.insertMany({bookName,description,writerName})
    res.status(200).json({message:"done",added})
        
})

//-- search --//
export const search=catchAsyncError( 
    async(req,res,next)=>{
    let{bookName}= req.body
    let id =req.userId
    if(id== undefined){return next(new appError("you should login first",404))}
    let search= await bookModel.find({bookName:{$regex:`${bookName}`}})
    if(search[0]==null){return next(new appError("notfound",404))}
        res.status(200).json({message:"done",search})
    })


//-- allBookIssued --//
export const allBookIssued =catchAsyncError( 
    async(req,res,next)=>{  
    let issued= await bookModel.find({bookIssued:true})
    if(issued[0]==null){ next(new appError("no bookIssued",404))}
        res.status(200).json({message:"done",issued})
    })


//-- allBookReturned --//
export const allBookReturned = catchAsyncError( 
    async(req,res,next)=>{  
    let issued= await bookModel.find({bookIssued:false})
    if(issued[0]==null){ next(new appError("no bookIssued",404))}
        res.status(200).json({message:"done",issued})
    })

//-- issuedBook --//
export const issuedBook= catchAsyncError( 
    async(req,res,next)=>{
    let {bookId,returnData}=req.body
    let id =req.userId
    if(id== undefined){return next(new appError("you should login first",404))}
    const nowDate= moment().format("MM-DD-YYYY")
    const book= await bookModel.findOneAndUpdate({_id:bookId,bookIssued:false},{bookIssued:true,userIssued:id,issuedDate:nowDate,returnData},{new:true})
    if(book==null){return next(new appError("book already issued",400))}
     res.status(200).json({message:"success",book})
    })

//-- returnedBook --//
export const returnedBook = catchAsyncError( async(req,res,next)=>{
    const {bookId}=req.body
    let id =req.userId
    if(id== undefined){return next(new appError("you should login first",404))} 
    const book= await bookModel.findOne({bookIssued:true,_id:bookId,userIssued:id})
    const nowDate= moment()
    book.fineIn=20
    let dayDelay=nowDate.diff(book.returnData,'days') 
    book.late= dayDelay
    book.fineIn=book.fineIn*dayDelay
    const returned= await bookModel.findOneAndUpdate({bookIssued:true,_id:bookId,userIssued:id},{bookIssued:false,userIssued:null},{new:true})
    res.status(200).json({message:"done",returned})
    })



