const error= (err,req,res,next)=>{
    //! globle error handler
    err.message=err.massege ||"Internal server error";
    err.statusCode=err.statusCode||500;
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        errObj:err,
    });
};
module.exports = error;