import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({
    "bookName":String,
    "description":String,
    "writerName":String,
    "bookIssued":{
        type:Boolean,
        default:false
    },
    "userIssued":{
        type:String,
        ref:"user"
    },
    "issuedDate":String,
    "returnData":String,
    "fineIn":{
        type:Number,
        default:0
    },
    "late":Number
},{
    timestamps:true
})

export const bookModel = mongoose.model("book",bookSchema)