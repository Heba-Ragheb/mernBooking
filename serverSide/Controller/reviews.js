const Review = require('../models/Review')
const Tour = require('../models/Tour')

const creatReview = async (req, res) => {
    const tourId = req.params.id
    const newReview = new Review({ ...req.body })
    const review = await newReview.save()
  
    try {
      const tour = await Tour.findById(tourId)
      if (!tour) {
        console.error(`Tour not found with id ${tourId}`)
        return res.status(404).json({ success: false, message: "Tour not found" })
      }
  
      await tour.updateOne({
        $push: { reviews: review._id }
      })
  
      res.status(201).json({ success: true, message: "Review created successfully", data: review })
    } catch (error) {
      console.error(`Error creating review: ${error.message}`)
      res.status(400).json({ success: false, message: "Review creation failed" })
    }
  }
module.exports =  creatReview 