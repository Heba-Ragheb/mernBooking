const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// Import Routers
const authRouter = require("./Router/authRouter");
const tourRouter = require("./Router/routerTours");
const userRouter = require("./Router/userRouter");
const reviewRouter = require("./Router/reviewRouter");
const bookingRouter = require("./Router/bookingRouter");

// Config
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gfuf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// ✅ Allowed origins
/**const allowedOrigins = [
  process.env.FRONT_BASE_URL, // from Railway
  "http://localhost:3000",
  "https://mern-booking-6gbi.vercel.app" // Vercel domain
];*/
const allowedOrigins = [
  "http://localhost:3000",
  /\.vercel\.app$/  // allow any vercel.app subdomain
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/JWT
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/tours", tourRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/reviews", reviewRouter);
app.use("/booking", bookingRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
