const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(
  {
    userId:{
        type: String, 
    },
    tourName:{
        type: String,
        required: true,
    },
    fullName: {
      type: String,
      required: true,
  
    },
    email: {
      type: String,
      required: true,
     
    },
   

  
    phone: {
      type: String,
      unique: true, // Add this line to make the phone field unique
    },
   guestSize:{
    type:Number,
    required: true,
   },
    bookAt: {
        type:Date,
        required: true,
      
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);