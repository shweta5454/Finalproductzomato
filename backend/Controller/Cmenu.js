const menu = require('../Model/Mmenu')

exports.getAllMenuByRestaurantName=(req,res)=>{
    console.log(menu)
    const filter={restaurantName:req.params.rName}
    menu.find(filter).then(result=>{
        res.status(200).json({ message:"MealTypes fetched successfully" , data:result})
    }).catch(e=>
        res.status(500).json({ message:"Error in DB" , error:e})
 
        )

}