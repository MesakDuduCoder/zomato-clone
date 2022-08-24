const Menu=require('../models/menu');


exports.getMenuByRestaurant=(req,res)=>{
    let filter={
        restaurantName:req.params.rName
    }
    Menu.find(filter)
    .then(result=>{
        res.status(200).json({
            message:"menu fetched successfully",
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