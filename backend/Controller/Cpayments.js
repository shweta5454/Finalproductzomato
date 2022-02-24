const Razorpay=require('razorpay')
const shortid=require('shortid')
const crypto=require('crypto')
const Transaction=require('../Model/Mtransaction')

const  razorpay=new Razorpay({
    key_id:"rzp_test_IUIhO6w1AOPtw5",
    key_secret:"wtcWrbyPwdxthremSeCYBjEQ"
})





exports.completePayment=async(req,res)=>{

    console.log(" Payment initiated!!!")
    const payment_capture=1
    const amount=req.body.amount;
    const currency="INR";
    const options={
         amount:amount*100,
         currency,
         receipt:shortid.generate(),
         payment_capture
            }
    
            try{

                const response=await razorpay.orders.create(options)//async method
                 console.log(response);
                 res.json(response)
            }catch(error){
                console.log(error)
            }
}

exports.saveTransaction=(req,res)=>{
    console.log("Saving Transactions......")
  const  generated_signature=crypto.createHmac('sha256',razorpay.key_secret)
    generated_signature.update(req.body.razorpay_order_id+"|"+req.body.transactionid)

    if(generated_signature.digest('hex')==req.body.razorpay_signature){
        const transaction=new Transaction({
            transactionid:req.body.transactionid,
            transactionamount:req.body.transactionamount
        })
        console.log(transaction)
        transaction.save(function(err,savedtransac){
            if(err){
                return res.status(500).send("some Problem occured")
            }
            res.send({transaction:savedtransac})
        })
    }
    else{
        res.send("Failed Transaction")
    }
}