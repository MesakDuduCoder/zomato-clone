const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   transaction_id:{
     type:String
   },
   transaction_amount:{
    type:String
  }
});

module.exports = mongoose.model("Transactions", transactionSchema)