const mongoose= require('mongoose')

const mealtypeSchema = new mongoose.Schema({
    _id:{
        type: String,
        required:true
    },
    name :{
        type: String,
        required:true
    },
    content :{
        type: String,
        required:true
    },
   
    image : {
        type: String,
        required:true
    }
})

module.exports = mongoose.model("MealTypes", mealtypeSchema, "mealtype" )