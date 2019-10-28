module.exports = function(err,req,res,next){
    res.status(402).json({
        error:true,
        message:err.message
    })
}