import mongoose from "mongoose";

const connectDB = async ()=>{


    await mongoose.connect(process.env.MONGO_URL);
    console.log(" Database connected Successfully ");
   
};

export default connectDB;