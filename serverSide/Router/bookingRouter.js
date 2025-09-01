const express= require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {verifyAdmin,verifyUser} = require('../Utili/verifiyToken')
const { creatBooking ,getBooking,getBookings } = require('../Controller/bookingController')
router.get('/:id', verifyUser,getBooking)
router.get('/',verifyAdmin, getBookings)
router.post('/',verifyUser, creatBooking)
module.exports = router