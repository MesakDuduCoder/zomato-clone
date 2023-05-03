const express=require('express')

const menuController=require('../controllers/menu')

const router=express.Router();

router.get('/:rName',menuController.getMenuByRestaurant)

module.exports=router;