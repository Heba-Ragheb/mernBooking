const express =require('express')
const User = require('../models/User')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password, email, photo, role  } = req.body;

  // Input validation
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate email format

  try {
    // Hash password with salt and iterations
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      photo,
      role,
    
    });

    res.status(201).json({ message: 'Registration successful', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};
const login = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email ) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passOk = await bycrpt.compare(req.body.password, user.password);
      if (!passOk) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const {role,password,...rest}=user._doc
  
      const token = jwt.sign({ role:user.role, _id: user._id }, "hdhdhdhdh", { expiresIn: "200000s" });
      res.cookie("token", token, { httpOnly: true }).json({
       data:{...rest},token,role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  };
module.exports ={register,login}