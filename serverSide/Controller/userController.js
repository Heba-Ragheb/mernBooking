const User = require("../models/User")

// creat tour
const creatUser = async (req, res) => {
    const newUser = new User(req.body)
    const user = await newUser.save()
    try {
        res.status(200).json({ success: true, message: "created successfully", data: user })
    } catch (error) {
        res.status(400).json({ success: false, message: "created failed" })
    }
}
const updateUser = async(req,res)=>{
   const id = req.params.id
   try {
    const updatedUser = await User.findByIdAndUpdate(id,{
        $set :req.body,

    },{new:true})
    res.status(200).json({message:"updated successful",data : updatedUser})
   } catch (error) {
    res.status(400).json({ success: false, message: "created failed" })
 
   }
}
const deleteUser = async(req,res)=>{
    const id = req.params.id
    try {
     await User.findByIdAndDelete(id)
     res.status(200).json({message:"deleted successful"})
    } catch (error) {
     res.status(400).json({ success: false, message: "deketed failed" })
  
    }
}

const getUser = async(req,res)=>{
    const id = req.params.id
    try {
     const user =await User.findById(id)
     res.status(200).json({message:" successful",data:user})
    } catch (error) {
     res.status(400).json({ success: false, message: "deketed failed" })
  
    }
}

const getUsers = async(req,res)=>{
    
    try {
        const users =await User.find({})
        
        .limit(8)
        res.status(200).json({message:" successful",data:users, count : users.length})
       } catch (error) {
        res.status(400).json({ success: false, message: "deketed failed" })
     
       }
}


module.exports = { creatUser , updateUser,getUsers ,getUser ,deleteUser }