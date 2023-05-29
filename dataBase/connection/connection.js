import mongoose from "mongoose";

export const connection= ()=>{
    mongoose.connect(process.env.dpURL).then(
        ()=>console.log('DB_Connected')).catch(
            (err)=>console.log({message:"err",err})
        )
}