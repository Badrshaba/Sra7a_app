
export const globalResponse = async (err,req,res,next)=>{
    if (err) {
        return res.status(500).json({message:"catch error",error:err.message})
    }
}