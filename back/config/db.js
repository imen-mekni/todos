const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log(process.env.MONGODB_URI);
  
  if (!uri) {
    console.error("❌ MONGODB_URI is missing in your .env file");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
