const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const dotenv = require("dotenv");
const cors = require("cors");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require("./routers/authRoutes.js");
const userRoutes = require("./routers/userRoutes.js");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wijayanandanaDB";

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    if (MONGO_URI.startsWith("mongodb+srv://")) {
        console.error("Check Atlas network access, IP whitelist, DNS support, and credentials.");
    } else {
        console.error("Check that MongoDB is running locally and the connection string is correct.");
    }
});