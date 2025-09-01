
const Booking = require("../models/booking")

// creat tour
/*const creatBooking = async (req, res) => {
    const newBooking = new Booking(req.body)
    const booking = await newBooking.save()
    try {
        res.status(200).json({ success: true, message: "created successfully", data: booking })
    } catch (error) {
        res.status(400).json({ success: false, message: "created failed" })
    }
}*/const creatBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const booking = await newBooking.save();
    res.status(200).json({ success: true, message: "Created successfully", data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: "Creation failed", error: error.message });
  }
};

const getBooking = async(req,res)=>{
    const id = req.params.id
    try {
     const booking =await Booking.findById(id)
     res.status(200).json({message:" successful",data:booking})
    } catch (error) {
     res.status(400).json({ success: false, message: "deketed failed" })
  
    }
}

const getBookings = async(req,res)=>{
    const page = parseInt(req.query.page)
    try {
        const bookings =await Booking.find({})
        .skip(page * 8)
        .limit(8)
        res.status(200).json({message:" successful",data:bookings})
       } catch (error) {
        res.status(400).json({ success: false, message: "deketed failed" })
     
       }
}
module.exports = {getBookings,getBooking,creatBooking}
