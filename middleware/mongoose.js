import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectDb() {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}




// import mongoose from "mongoose";

// const connectDb = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     console.log("🟢 Using existing database connection");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connected successfully");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//   }
// };

// export default connectDb;
