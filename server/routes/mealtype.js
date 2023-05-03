const express=require('express')

const mealtypeController=require('../controllers/mealtype')

const router=express.Router();

router.get('',mealtypeController.getAllmealTypes)

module.exports=router;