const location=require('../Model/Mlocation')
exports.getAllLocations=(req,res)=>{
    location.find().then(result=>{
        res.status(200).json({
            message:"Location fetched successfully",
            data:result
        })
    }).catch(error=>{
        res.status(200).json({
            message:"error in db",
            error:error
        })

    })
}