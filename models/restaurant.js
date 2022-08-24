const mongoose= require('mongoose')

const restaurantSchema = new mongoose.Schema({
    _id:{
        type: String,
        required:true
    },
    name :{
        type: String,
        required:true
    },
    city_name :{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    area:{
        type: String,
        required:true
    },
    locality : {
        type: String,
        required:true
    },
    thumb: {
        type: String,
        required:true
    },
    cost: {
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    type:{
        type: Array,
        required:true
    },
    Cuisine:{
        type: Array,
        required:true
    }
})

module.exports = mongoose.model("Restaurants", restaurantSchema, "restaurants" )