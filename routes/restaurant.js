const express=require('express')

const restaurantController=require('../controllers/restaurantCon')

const router=express.Router();

router.get('',restaurantController.getAllRestaurants)
router.get('/:cName',restaurantController.getAllRestaurantsBycity)
router.get('/details/:name',restaurantController.getRestaurantDetails)
router.post('/filter/:pageNo',restaurantController.getAllRestaurantsByFilter)


module.exports=router;