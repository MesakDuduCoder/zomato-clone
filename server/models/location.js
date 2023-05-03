const mongoose=require('mongoose')

const locationSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    city_id:{
        type:String,
        required:true
    },
    location_id:{
        type:String,
        required:true
    },
    country_name:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("Locations",locationSchema,"location")