const express=require('express');
const restaurantController=require('../Controller/Crestaurants')
const locationController=require('../Controller/Clocation')
const mealtypeController=require('../Controller/CMealtype');
const menuController=require('../Controller/Cmenu');
const userController=require('../Controller/Cuser');
const { Router } = require('express');


router=express.Router();
router.get('/restaurants/',restaurantController.getAllRestaurants)

router.get('/restaurants/:city_id',restaurantController.getAllRestaurantsBycity)//city_id in location is city in restaurants 

router.post('/restaurants/filter/:PageNo',restaurantController.getAllrestaurantsByFilter)//filter 

router.get('/restaurantDetails/:name',restaurantController.getAllRestaurantDetails)//restaurant details when restaurant name is selected



//location route
router.get('/locations/',locationController.getAllLocations)

//MealType
router.get('/mealtype',mealtypeController.getAllMealtypes)

//Menu route
router.get('/menu/:rName',menuController.getAllMenuByRestaurantName)

//login route
router.post('/userLogin',userController.UserLogIn)
router.post('/userSignUp',userController.UserSignUp)

module.exports=router;