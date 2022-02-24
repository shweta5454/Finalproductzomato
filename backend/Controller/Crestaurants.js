const restaurants = require("../Model/Mrestaurants");

exports.getAllRestaurants=(req,res)=>{
  restaurants
  .find()
  // .limit(2)
  // .skip(2 * (req.params.PageNo - 1))
  .then((result) => {
    res.status(200).json({
      message:"data fetched successfully",
      result:result
    })
  })
  .catch((error) =>
  res.send(error)
  );
}



exports.getAllRestaurantsBycity=(req,res)=>{

    // const filter.city=req.params.city_id
    const filter={city:req.params.city_id}

  restaurants.find(filter).select({"name":1,"_id":0}).then(
      result=>{
          res.status(200).json({ message:"data fetched successfully" , data:result })
      }
      ).catch(error=>{
        res.status(500).json({ message:"Error in database" , error:error })
      })
      
    }
    
    //restaurantsdetail by cityname
    exports.getAllRestaurantDetails=(req,res)=>{
      const filter={name:req.params.name}
    
    
      restaurants.findOne(filter).then(
          result=>{
              res.status(200).json({ message:"data fetched successfully" , data:result })
          }
      ).catch(error=>{
              res.status(500).json({ message:"Error in database" , error:error })
      })
    
    }

exports.getAllrestaurantsByFilter = (req, res) => {
  console.log("helo i am filter")
  console.log(restaurants)
  const filter={};
  //location dropdown by city_id in location and city in restaurant
  if(req.body.city_id){
    filter.city=req.body.city_id
  }
  
  //filter by Cuisine
  if(req.body.cuisine && req.body.cuisine.length>0){
    filter['Cuisine.name']={ $in : req.body.cuisine }
  }

  //filter by mealtype in type[name] restaurants
  if(req.body.mealtype && req.body.mealtype.length>0){
    filter['type.name']={ $in : req.body.mealtype }
  }
  
  //filter by cost
  if(req.body.lcost && req.body.hcost){
    if(req.body.lcost==0){
      filter.cost={
        $lt:req.body.hcost
      }
    }
    else{
      filter.cost={
        $lt:req.body.hcost,
        $gt:req.body.lcost
      }
    }
  }
  
  //filter by _id giving detail of restaurants
  console.log(req.body.id)
  if(req.body.id){
    filter._id=req.body.id;
   }    
  //sorting
  // let sort=1;
  // if(req.body.sort){
  //   sort:req.body.sort;
  //   }


    //filter by restaurant id
    if(req.body.id){
        filter._id=req.body.id;
    }

    filter.sort=req.body.sort
    //Pagination through limit and skip
  restaurants
    .find(filter)
    .limit(2)
    .skip(2 * (req.params.PageNo - 1)).sort({"cost":req.body.sort})
    .then((result) => {
      console.log(filter)
      restaurants.find(filter).count((err,count)=>{
        if(err)
        console.log(err)
      else
      res.status(200).json({
        message: "data fetched successfully",
        data: result,totalRecords:count
      });
    })
  })
    .catch((error) =>
      res.status(500).json({
        message: "error in DB",
        error: error,
      })
    );
};
