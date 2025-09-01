
const Tour = require("../models/Tour")

// creat tour
const creatTour = async (req, res) => {
    const newTour = new Tour(req.body)
    const tour = await newTour.save()
    try {
        res.status(200).json({ success: true, message: "created successfully", data: tour })
    } catch (error) {
        res.status(400).json({ success: false, message: "created failed" })
    }
}
const updateTour = async(req,res)=>{
   const id = req.params.id
   try {
    const updatedTour = await Tour.findByIdAndUpdate(id,{
        $set :req.body,

    },{new:true})
    res.status(200).json({message:"updated successful",data : updatedTour})
   } catch (error) {
    res.status(400).json({ success: false, message: "created failed" })
 
   }
}
const deleteTour = async(req,res)=>{
    const id = req.params.id
    try {
     await Tour.findByIdAndDelete(id)
     res.status(200).json({message:"deleted successful"})
    } catch (error) {
     res.status(400).json({ success: false, message: "deketed failed" })
  
    }
}

const getTour = async(req,res)=>{
    const id = req.params.id
    try {
     const tour =await Tour.findById(id).populate('reviews')
     res.status(200).json({message:" successful",data:tour})
    } catch (error) {
     res.status(400).json({ success: false, message: "deketed failed" })
  
    }
}

const getTours = async(req,res)=>{
    const page = parseInt(req.query.page)
    try {
        const tours =await Tour.find({}).populate('reviews')
        .skip(page * 8)
        .limit(8)
        res.status(200).json({message:" successful",data:tours, count : tours.length})
       } catch (error) {
        res.status(400).json({ success: false, message: "deketed failed" })
     
       }
}
const getTourSearch = async(req,res)=>{
    const city = new RegExp(req.query.city,'i')
   const distance = parseInt(req.query.distance)
   const maxGroupSize= parseInt(req.query.maxGroupSize)
   try {
      const search = await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
      res.status(200).json({message:" successful",data:search})
       
   } catch (error) {
    res.status(400).json({ success: false, message: " failed" })
     
   }
} 
const getFeatueredTour = async(req,res)=>{
    try {
        const search = await Tour.find({
            featured:true
            }).limit(8).populate('reviews')
        res.status(200).json({message:" successful",data:search})
         
     } catch (error) {
      res.status(400).json({ success: false, message: " failed" })
       
     }
}
const tourCount = async(req,res)=>{
try {
    const count = await Tour.estimatedDocumentCount()
    res.status(200).json({message:" successful",data:count})
} catch (error) {
    res.status(400).json({ success: false, message: " failed" })
       
}
}

module.exports = {tourCount,getFeatueredTour,getTourSearch, creatTour , updateTour,getTours ,getTour ,deleteTour }