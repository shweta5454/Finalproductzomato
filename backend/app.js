// 1)importing packages
const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const edumato=require('./Routes/edumato');
const mongoose=require('mongoose');
const paymentRoutes=require('./Routes/payment');

//2)creating server
app=express();


const mongoServer=process.env.MONGO_URI||"mongodb://localhost/edumato";

mongoose.connect(mongoServer,()=>{
console.log("Mongodb connected")},
e=>console.log(e))


// 3)using middleware
app.use(cors());
app.use(bodyParser.json());

//middleware Routes
app.use('/edumato',edumato);
app.use('/pay',paymentRoutes);

//heroku routes
if(process.env.NODE_ENV=="production"){
    app.use(express.static("zomato/build"))
    const path=require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"zomato","build","index.html"))
    })
}
// 5)listening to server
app.listen(process.env.PORT||8080,()=>{
    console.log("server started at port number:8080");
});

