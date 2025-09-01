const express= require('express')
const mongoose = require('mongoose')
const  creatReview =require('../Controller/reviews')
const {verifyUser} = require('../Utili/verifiyToken')
const router = express.Router()

router.post('/tours/:id/reviews',verifyUser, creatReview)

module.exports = router