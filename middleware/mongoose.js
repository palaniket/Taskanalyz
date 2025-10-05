import mongoose from "mongoose";
const connectDb=handler=>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req,res);
}
export default connectDb;

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
