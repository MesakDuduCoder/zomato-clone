const Restaurants = require('../models/restaurant')
const fs=require('fs')

exports.getAllRestaurants=(req,res)=>{
    Restaurants.find()
    .then(result=>{
        res.status(200).json({
            message:"restaurants fetched successfully",
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
   
exports.getAllRestaurantsBycity=(req,res)=>{
    let criteria={city:req.params.cName}


    Restaurants.find(criteria).then(
        result=>{
            res.status(200).json({ message:"data fetched successfully" , data:result })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }

 exports.getAllRestaurantsByFilter=(req,res)=>{
    const filter={}

     if(req.body.city){
         filter.city= req.body.city
     }

     if(req.body.Cuisine && req.body.Cuisine.length >0 ){
        filter['Cuisine.name']={ $in : req.body.Cuisine }
     }

     if(req.body.type && req.body.type.length >0 ){
        filter['type.name']={ $in : req.body.type }
     }
     
     if(req.body.lcost && req.body.hcost){
         if(req.body.lcost==0){
             filter.cost ={
                 $lte :req.body.hcost
             }
         }
         else{
            filter.cost= {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            } 
         }
     }

     
         filter.sort=req.body.sort
     
    //logic of pagination achieved through limit and skip 
    Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost":filter.sort}).then(
        result=>{
            Restaurants.find(filter).count((err,count)=>{
                if(err)
                console.log(err)
                else
                res.status(200).json({ message:"data fetched successfully" , data:result ,totalRecords:count})
      
            })
             }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }

 

 exports.getRestaurantDetails = (req, res)=>{
    let criteria={name:req.params.name}


    Restaurants.findOne(criteria).then(
        result=>{
            res.status(200).json({ message:"data fetched successfully" , data:result })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }
 