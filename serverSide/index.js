const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotnev= require('dotenv')
const app = express()
dotnev.config()
const authRouter = require('./Router/authRouter')
const tourRouter = require('./Router/routerTours')
const userRouter = require('./Router/userRouter')
const reviewRouter = require('./Router/reviewRouter')
const bookingRouter = require('./Router/bookingRouter')
const port = process.env.PORT 

//const uri =  "mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gfuf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const uri =  `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gfuf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
 
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())

// Connect to MongoDB
const conectDB = async () => {

    try {
        mongoose.set('strictQuery', false);
     await mongoose.connect(uri)
      console.log("connected")
    } catch (error) {
      console.log(error)
      process.exit()
    }
  }

  conectDB();
  app.use('/tours',tourRouter)
  app.use('/users',userRouter)
  app.use('/user',authRouter)
  app.use('/',reviewRouter)
  app.use('/booking',bookingRouter)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})