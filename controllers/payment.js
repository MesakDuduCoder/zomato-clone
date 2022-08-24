const Razorpay=require('razorpay');
const crypto = require('crypto')
const shortid = require('shortid')
const Transactions=require('../models/transaction')

const instance = new Razorpay({
    key_id:"rzp_test_Ikdn0xCsfgCcHa",
    key_secret:"sie55iSR0opT76EXgohviAeb"
})

exports.createOrder=async (req,res)=>{
    console.log("payment initiated")
        const options= {
            amount:req.body.amount*100,
            currency : "INR",
            receipt : shortid.generate(),
            payment_capture : 1,
            notes : {
            key1: "value3", 
            key2: "value2"
            }

        }
 try{
    const response = await instance.orders.create(options)
    //console.log(response);
    res.json(response)
 }catch(error){
   console.log(error)
 }
}


exports.saveTransaction=(req,res)=>{
    console.log("saving transaction")
     const generated_signature=crypto.createHmac('sha256', instance.key_secret);
     generated_signature.update(req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id)

     if(req.body.razorpay_signature==generated_signature.digest('hex')){
            console.log("creating transaction object");
        //save transaction to collection
        const transaction = new Transactions({
            transaction_id:req.body.razorpay_payment_id,
            transaction_amount:req.body.razorpay_amount
        });
   
        transaction.save(function(err,transaction){
            if(err){
                console.log(error);
                return res.status(500).send("some problem occur",error)
            }
            console.log("transaction saved to db")
            res.send({transaction:transaction});
        })
    }
}



