const express= require('express')
const mongoose = require('mongoose')
const { creatUser ,updateUser,deleteUser,getUser,getUsers } = require('../Controller/userController')
const router = express.Router()
const {verifyUser} = require('../Utili/verifiyToken')

router.post('/', verifyUser,creatUser)
router.put('/:id',verifyUser, updateUser)
router.delete('/:id',verifyUser, deleteUser)
router.get('/:id',verifyUser, getUser)
router.get('/',verifyUser, getUsers)

module.exports = router