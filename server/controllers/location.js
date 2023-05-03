const Locations=require('../models/location');

exports.getAllLocations=(req,res)=>{
    Locations.find().then(result=>{
        res.status(200).json({ message:"Locations fetched successfully" , data:result})
    }).catch(e=>
        res.status(500).json({ message:"Error in DB" , error:e})
 
        )

}