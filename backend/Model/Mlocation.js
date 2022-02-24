const express = require("express");
const mongoose = require("mongoose");

const locationSchema=new mongoose.Schema({
    name:{type:String,
            required:true},
    city_id:{type:String,
            required:true},
    localiton_id:{type:String,
            required:true},
    country_name:{type:String,
            required:true},
            
})
                        //exporting name of model,schemaname,collection name are parameters of model
module.exports=mongoose.model('locations',locationSchema,'location')