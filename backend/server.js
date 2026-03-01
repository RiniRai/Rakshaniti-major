// ==========================
// server.js
// ==========================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import announcementRouter from "./routes/announcementRouter.js";
import schemeAppliedRouter from "./routes/schemeAppliedRouter.js";

dotenv.config(); // Load env FIRST

import { connectDb } from "./config/dB.js";
import twilio from "twilio";
import userRoutes from "./routes/userRouter.js";
 
// ==========================
// Initialize App
// ==========================
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// Middleware
// ==========================
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
  })
);

// ==========================
// Connect Database
// ==========================
connectDb();

// ==========================
// Twilio Setup (OTP)
// ==========================
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// OTP generator
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ==========================
// OTP Route
// ==========================
app.post("/api/v1/user/auth/generate-otp", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile)
      return res
        .status(400)
        .json({ success: false, message: "Mobile number required" });

    const otp = generateOtp();

    await twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobile}`,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
      otp, // remove in production
    });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

// ==========================
// User Routes (Google, Login, Register)
// ==========================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/schemes", schemeAppliedRouter);


// ==========================
// Health Check
// ==========================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ==========================
// Start Server
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
  console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
});
