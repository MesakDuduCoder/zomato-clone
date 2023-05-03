const MealTypes=require('../models/mealtype');


exports.getAllmealTypes=(req,res)=>{
    MealTypes.find()
    .then(result=>{
        res.status(200).json({
            message:"mealtypes fetched successfully",
            data:result
         })
        })
       .catch(
           error=>{
            res.status(500).json({
                message:"DB error",
                error:error
            })
           })
       
}