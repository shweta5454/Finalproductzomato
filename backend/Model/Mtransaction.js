const mongoose=require('mongoose')
const transactionSchema=new mongoose.Schema({
   transactionid:{
       type:String
   },
   transactionamount:{
       type:String
   }         
})

module.exports=mongoose.model("Transaction",transactionSchema,"Transaction")