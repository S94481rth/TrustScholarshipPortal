const mongoose = require('mongoose');
const bankDetailSchema = new mongoose.Schema({
  account_holder_name  : {
    type: String,
  },
  account_number: {
    type: String,
    // required: true
  },
  ifsc_code: {
    type : String
  },
  bank_name :{
    type : String,
  },
  branch_name :{
    type: String
  }
});



const BankDetail = mongoose.model('BankDetails', bankDetailSchema);

module.exports = BankDetail;
