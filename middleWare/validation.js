
export const validation = (schema)=>{
    return (req,res,next)=>{
       let {error}= schema.validate(req.body,{abortEarly :false})
        if(error){
            res.json({message:"validation error",error})
        }else{
            next()
        }
    }
}   