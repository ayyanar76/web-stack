export default (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error"
    err.statuscode = err.statuscode || 500

    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}