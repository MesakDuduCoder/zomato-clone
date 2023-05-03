const express=require('express')
const locationController= require('../controllers/location')
const router=express.Router()



router.get('',locationController.getAllLocations)

module.exports=router;